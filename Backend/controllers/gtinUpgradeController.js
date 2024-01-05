import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

const gtinUpgradePricingSchema = Joi.array().items(Joi.object({
    total_no_of_barcodes: Joi.number().required(),
    price: Joi.number().required()
}));

export const createGtinUpgradePricing = async (req, res, next) => {
    try {
        const { error } = gtinUpgradePricingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const records = req.body;

        const newRecords = await prisma.gtin_upgrade_pricing.createMany({
            data: records,
        });
        res.status(201).json(newRecords);
    } catch (error) {
        next(error);
    }
};


export const getAllGtinUpgradePricing = async (req, res, next) => {
    try {
        const records = await prisma.gtin_upgrade_pricing.findMany({
            orderBy: {
                updated_at: 'desc'
            }
        });
        res.json(records);
    } catch (error) {
        next(error);
    }
};


export const getGtinUpgradePricingById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const record = await prisma.gtin_upgrade_pricing.findUnique({
            where: { id: id },
        });
        if (!record) {
            return next(createError(404, 'Record not found'));
        }
        return res.json(record);
    } catch (error) {
        next(error);
    }
};

const gtinUpgradePricingUpdateSchema = Joi.array().items(Joi.object({
    id: Joi.string().required(),
    total_no_of_barcodes: Joi.number(),
    price: Joi.number()
}));


export const updateGtinUpgradePricings = async (req, res, next) => {
    try {
        const { error } = gtinUpgradePricingUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const records = req.body;
        const updatePromises = records.map(record => {
            const { id, ...data } = record;
            return prisma.gtin_upgrade_pricing.update({
                where: { id: id },
                data: data
            });
        });

        const updatedRecords = await Promise.all(updatePromises);
        res.json(updatedRecords);
    } catch (error) {
        next(error);
    }
};

const gtinUpgradePricingDeleteSchema = Joi.array().items(Joi.string().required());

export const deleteGtinUpgradePricings = async (req, res, next) => {
    try {
        const { error } = gtinUpgradePricingDeleteSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const ids = req.body;

        await prisma.gtin_upgrade_pricing.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return res.json({ message: 'Records deleted successfully' });
    } catch (error) {
        next(error);
    }
};
