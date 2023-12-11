// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const brandSchema = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255).required(),
    status: Joi.string().valid('active', 'inactive').required(),
    user_id: Joi.string().required(),
});

export const createBrand = async (req, res, next) => {
    try {
        const { error, value } = brandSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const brand = await prisma.brands.create({
            data: value,
        });

        res.status(201).json(brand);
    } catch (error) {
        next(error);
    }
};


const allowedColumns = {
    id: Joi.string(),
    name: Joi.string(),
    status: Joi.string(),
    user_id: Joi.string(),
    // Add more columns as needed
};


const filterSchema = Joi.object(
    Object.keys(allowedColumns).reduce((schema, column) => {
        schema[column] = allowedColumns[column];
        return schema;
    }, {})
).unknown(false); // Disallows any keys that are not defined in the schema

export const getBrands = async (req, res, next) => {
    try {
        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Check if any filter conditions are provided
        const hasFilterConditions = Object.keys(value).length > 0;

        // Construct filter conditions for Prisma query
        const filterConditions = hasFilterConditions
            ? Object.keys(value).reduce((obj, key) => {
                obj[key] = value[key];
                return obj;
            }, {})
            : {};

        const brands = await prisma.brands.findMany({
            where: filterConditions
        });

        res.json(brands);
    } catch (error) {
        next(error);
    }
};


export const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'id is required' });
        const { error, value } = brandSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedBrand = await prisma.brands.update({
            where: { id: id },
            data: value,
        });

        res.json(updatedBrand);
    } catch (error) {
        next(error);
    }
};



export const deleteBrand = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = value;




        const brand = await prisma.brands.deleteMany({
            where: { id: id },
        });
        console.log(brand);
        if (brand.count === 0) {
            return next(createError(404, 'Brand not found'));
        }


        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        next(error);
    }
};
