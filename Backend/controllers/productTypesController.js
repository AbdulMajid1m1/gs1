import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

// Validation schema
const productTypeSchema = Joi.object({
    name: Joi.string().max(255),
    status: Joi.number().integer(),
});

// CRUD operations
export const createProductType = async (req, res, next) => {
    try {
        const { error, value } = productTypeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = value
        const newProductType = await prisma.product_types.create({
            data: { name, status },
        });

        res.status(201).json(newProductType);
    } catch (error) {
        next(error);
    }
};

export const getAllProductTypes = async (req, res, next) => {
    try {
        const productTypes = await prisma.product_types.findMany();
        res.json(productTypes);
    } catch (error) {
        next(error);
    }
};

export const getProductTypeById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use joito validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = value;
        const productType = await prisma.product_types.findUnique({
            where: { id: id },
        });

        if (!productType) {
            return next(createError(404, 'Product Type not found'));
        }

        res.json(productType);
    } catch (error) {
        next(error);
    }
};

export const updateProductType = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError, value: idValue } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = idValue;
        const { error } = productTypeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = req.body;
        const updatedProductType = await prisma.product_types.update({
            where: { id: id },
            data: { name, status },
        });

        res.json(updatedProductType);
    } catch (error) {
        next(error);
    }
};

export const deleteProductType = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { id } = value;
    try {
        await prisma.product_types.delete({
            where: { id: id },
        });
        res.json({ message: 'Product Type deleted successfully' });
    } catch (error) {
        // Check if the error is due to a non-existent record
        if (error.code === 'P2025') {
            return next(createError(404, 'Product Type not found'));
        }
        next(error);
    }
};
