import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



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