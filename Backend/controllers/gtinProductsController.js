import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { createAdminLogs } from '../utils/functions/historyLogs.js';



export const getAllgtinProducts = async (req, res, next) => {
    try {
        const gtinProducts = await prisma.gtin_products.findMany(
            {
                where: {
                    status: 1,
                },
            }

        );

        res.json(gtinProducts);
    } catch (error) {
        next(error);
    }
};


export const getGtinSubscriptions = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            react_no: Joi.number(),
            transaction_id: Joi.string(),
            user_id: Joi.string(),
            pkg_id: Joi.string(),
            status: Joi.string().valid('active', 'inactive'),
            isDeleted: Joi.boolean(),
        };

        // Create a dynamic schema based on the allowed columns
        const filterSchema = Joi.object(
            Object.keys(allowedColumns).reduce((schema, column) => {
                schema[column] = allowedColumns[column];
                return schema;
            }, {})
        ).unknown(false); // Disallow unknown keys

        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Construct filter conditions for Prisma query
        const filterConditions = Object.keys(value).length > 0
            ? Object.keys(value).reduce((obj, key) => {
                obj[key] = value[key];
                return obj;
            }, {})
            : {};

        // Fetch gtin_subcriptions and include related gtin_products
        const [gtinSubscriptions, otherProductSubscriptions] = await prisma.$transaction([
            prisma.gtin_subcriptions.findMany({
                where: filterConditions,
                include: {
                    gtin_product: true,
                },
            }),
            prisma.other_products_subcriptions.findMany({
                where: filterConditions,
                include: {
                    product: true,
                },
            }),
        ]);


        // Return the fetched data
        return res.json({ gtinSubscriptions, otherProductSubscriptions });
    } catch (error) {
        console.error(error);
        next(createError(500, 'Server error occurred'));
    }
};


export const getUserSubscribedProductsNames = async (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.query);
    if (error) {
        return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
    }
    const userId = value.userId;

    try {
        const subscribedProducts = await prisma.other_products_subcriptions.findMany({
            where: {
                user_id: userId,
                status: 'active',
                isDeleted: false,
            },
            include: {
                product: {
                    select: {
                        product_name: true
                    }
                }
            }
        });

        // Extract product names
        const productNames = subscribedProducts.map(sub => sub.product.product_name);
        res.status(200).json(productNames);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error occurred');
    }
};


// Delete a GTIN Subscription
export const deleteGtinSubscription = async (req, res, next) => {
    const { id } = req.params;

    try {
        await prisma.gtin_subcriptions.update({
            where: { id: id },
            data: { isDeleted: true, deleted_at: new Date() },
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        next(createError(500, 'Server error occurred'));
    }
};


// Delete Other Products Subscription
// Joi schema for request parameter validation
const deleteOtherProductsSubscriptionSchema = Joi.object({
    id: Joi.string().required(),
    transaction_id: Joi.string().required(),
    product_id: Joi.string().required(),
});

export const deleteOtherProductsSubscription = async (req, res, next) => {
    try {
        const { error, value } = deleteOtherProductsSubscriptionSchema.validate(req.query);
        if (error) {
            throw createError(400, `Invalid request parameters: ${error.details[0].message}`);
        }
        const { id, transaction_id, product_id } = value;
        let productName = '';
        let cart;
        const result = await prisma.$transaction(async (prisma) => {
            cart = await prisma.carts.findFirst({
                where: {
                    transaction_id: transaction_id,
                },
            });

            if (!cart) {
                throw createError(404, 'Cart not found');
            }

            const cartItems = JSON.parse(cart.cart_items);
            // get the deleting prduct name productName from cartItems
            productName = cartItems.find(item => item.productID === product_id)?.productName;
            const newCartItems = cartItems.filter(item => item.productID !== product_id);
            const newCartItemsStr = JSON.stringify(newCartItems);

            // Update the cart within the transaction   
            const updatedCart = await prisma.carts.update({
                where: { id: cart.id },
                data: {
                    cart_items: newCartItemsStr,
                },
            });

            const count = await prisma.other_products_subcriptions.deleteMany({
                where: { id: id },
            });

            if (count === 0) {
                throw createError(404, 'Subscription not found');
            }

            return { updatedCart, count };
        });

        if (req?.admin?.adminId) {
            const adminLog = {
                subject: `Admin deleted ${productName} subscription`,
                admin_id: req.admin.adminId,
                user_id: cart.user_id,

            }
            await createAdminLogs(adminLog);
        }


        // Return the result after the transaction
        return res.status(200).json({ ...result });

    } catch (error) {
        console.error(error);
        next(error);
    }
};
