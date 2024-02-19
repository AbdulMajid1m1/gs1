import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

// Validation schema
const productCategorySchema = Joi.object({
    name: Joi.string().max(255),
    name_ar: Joi.string().max(255),
    status: Joi.number().integer(),
});

// CRUD operations
export const createProductCategory = async (req, res, next) => {
    try {
        const { error, value } = productCategorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = value;
        const newProductCategory = await prisma.product_categroies.create({
            data: { name, status },
        });

        res.status(201).json(newProductCategory);
    } catch (error) {
        next(error);
    }
};

export const getAllProductCategories = async (req, res, next) => {
    try {
        const productCategories = await prisma.product_categroies.findMany();
        res.json(productCategories);
    } catch (error) {
        next(error);
    }
};

export const getProductCategoryById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = value;
        const productCategory = await prisma.product_categroies.findUnique({
            where: { id: id },
        });

        if (!productCategory) {
            return next(createError(404, 'Product Category not found'));
        }

        res.json(productCategory);
    } catch (error) {
        next(error);
    }
};

export const updateProductCategory = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError, value: idValue } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = idValue;
        const { error } = productCategorySchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            name,
            status,
            name_ar
        } = req.body;
        const updatedProductCategory = await prisma.product_categroies.update({
            where: { id: id },
            data: {
                name,
                status,
                name_ar
            },
        });

        res.json(updatedProductCategory);
    } catch (error) {
        next(error);
    }
};

export const deleteProductCategory = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { id } = value;
    try {
        await prisma.product_categroies.delete({
            where: { id: id },
        });
        res.json({ message: 'Product Category deleted successfully' });
    } catch (error) {
        if (error.code === 'P2025') {
            return next(createError(404, 'Product Category not found'));
        }
        next(error);
    }
};
