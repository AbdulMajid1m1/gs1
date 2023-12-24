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
            // ... other fields ...
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

        // Fetch gtin_subcriptions from the database
        const gtinSubcriptions = await prisma.gtin_subcriptions.findMany({
            where: filterConditions,
        });

        // Collect all pkg_ids from the subscriptions
        const pkgIds = gtinSubcriptions.map(sub => sub.pkg_id).filter(id => id != null);

        // Fetch all relevant gtin_products in a single query
        const relevantGtinProducts = await prisma.gtin_products.findMany({
            where: {
                id: { in: pkgIds },
            },
        });

        // Map gtin_products to their respective subscriptions
        const combinedData = gtinSubcriptions.map(subscription => ({
            ...subscription,
            gtinProduct: relevantGtinProducts.find(product => product.id === subscription.pkg_id) || null,
        }));

        return res.json(combinedData);
    } catch (error) {
        console.log(error);
        next(error);
    }
};