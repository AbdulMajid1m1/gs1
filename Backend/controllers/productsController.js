import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';


export const getProducts = async (req, res, next) => {
    try {
        // Define allowable columns for filtering (for products)
        const allowedColumns = {
            id: Joi.string(),
            user_id: Joi.string(),
            gcpGLNID: Joi.string(),
            // ... define validation for other allowed columns for products
        };

        // Create a dynamic schema based on the allowed columns for products
        const filterSchema = Joi.object(
            Object.keys(allowedColumns).reduce((schema, column) => {
                schema[column] = allowedColumns[column];
                return schema;
            }, {})
        ).unknown(false); // Disallows any keys that are not defined in the schema

        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Construct filter conditions for Prisma query
        const filterConditions = { ...value };

        // Fetch products based on filter conditions
        const products = await prisma.products.findMany({
            where: filterConditions,
            orderBy: { updated_at: 'desc' } // Sort by updated_at in descending order
        });

        return res.json(products);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
