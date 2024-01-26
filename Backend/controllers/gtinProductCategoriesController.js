
import Joi from 'joi';
import prisma from '../prismaClient.js';
import { createError } from '../utils/createError.js';


// Define a validation schema for creating or updating a gtin_products entry
const gtinProductsSchema = Joi.object({
    member_category_description: Joi.string().max(255),
    total_no_of_barcodes: Joi.number().integer(),
    member_registration_fee: Joi.number().integer(),
    gtin_yearly_subscription_fee: Joi.number().integer(),
    type: Joi.string().max(255),
    status: Joi.number().integer(),
    gcp_start_range: Joi.string().max(50),
    quotation: Joi.string().max(255),
    allow_otherProducts: Joi.string().max(255),
    gcp_type: Joi.string().max(50),
    gtin_order: Joi.string().max(50),
    member_category_description_ar: Joi.string().max(255),
    med_registration_fee: Joi.number().precision(2),
    med_yearly_subscription_fee: Joi.number().precision(2),
});




// Controller functions
export const createGtinProducts = async (req, res, next) => {
    try {
        const { error } = gtinProductsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            member_category_description,
            total_no_of_barcodes,
            member_registration_fee,
            gtin_yearly_subscription_fee,
            type,
            status,
            gcp_start_range,
            quotation,
            allow_otherProducts,
            gcp_type,
            gtin_order,
            member_category_description_ar,
            med_registration_fee,
            med_yearly_subscription_fee,
        } = req.body;

        const createdGtinProducts = await prisma.gtin_products.create({
            data: {
                member_category_description,
                total_no_of_barcodes,
                member_registration_fee,
                gtin_yearly_subscription_fee,
                type,
                status,
                gcp_start_range,
                quotation,
                allow_otherProducts,
                gcp_type,
                gtin_order,
                member_category_description_ar,
                med_registration_fee,
                med_yearly_subscription_fee,
            },
        });

        res.status(201).json(createdGtinProducts);
    } catch (error) {
        next(error);
    }
};

export const getAllGtinProducts = async (req, res, next) => {
    try {
        const gtinProducts = await prisma.gtin_products.findMany({
            orderBy: {
                updated_at: 'desc',
            },
        });

        res.json(gtinProducts);
    } catch (error) {
        next(error);
    }
};

export const getGtinProductsById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const gtinProducts = await prisma.gtin_products.findUnique({
            where: { id: id },
        });

        if (!gtinProducts) {
            return next(createError(404, 'gtin_products not found'));
        }

        res.json(gtinProducts);
    } catch (error) {
        next(error);
    }
};

export const updateGtinProducts = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error: idError } = schema.validate(req.params);

        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error, value } = gtinProductsSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const {
            member_category_description,
            total_no_of_barcodes,
            member_registration_fee,
            gtin_yearly_subscription_fee,
            type,
            status,
            gcp_start_range,
            quotation,
            allow_otherProducts,
            gcp_type,
            gtin_order,
            member_category_description_ar,
            med_registration_fee,
            med_yearly_subscription_fee,
        } = value;

        const updatedGtinProducts = await prisma.gtin_products.update({
            where: { id: id },
            data: {
                member_category_description,
                total_no_of_barcodes,
                member_registration_fee,
                gtin_yearly_subscription_fee,
                type,
                status,
                gcp_start_range,
                quotation,
                allow_otherProducts,
                gcp_type,
                gtin_order,
                member_category_description_ar,
                med_registration_fee,
                med_yearly_subscription_fee,
            },
        });

        res.json(updatedGtinProducts);
    } catch (error) {
        next(error);
    }
};

export const deleteGtinProducts = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        await prisma.gtin_products.delete({
            where: { id: id },
        });

        return res.json({ message: 'gtin_products deleted successfully' });
    } catch (error) {
        next(error);
    }
};