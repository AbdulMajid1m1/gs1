
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

const gtinUpgradePricingSchema = Joi.object({
    total_no_of_barcodes: Joi.number().integer(),
    price: Joi.number().required(),
});

// Controller functions
export const createGtinUpgradePricing = async (req, res, next) => {
    try {
        const { error } = gtinUpgradePricingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { total_no_of_barcodes, price } = req.body;

        const createdGtinUpgradePricing = await prisma.gtin_upgrade_pricing.create({
            data: {
                total_no_of_barcodes,
                price,
            },
        });

        res.status(201).json(createdGtinUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const getAllGtinUpgradePricing = async (req, res, next) => {
    try {
        const gtinUpgradePricing = await prisma.gtin_upgrade_pricing.findMany({
            orderBy: {
                updated_at: 'desc',
            },
        });

        res.json(gtinUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const getGtinUpgradePricingById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const gtinUpgradePricing = await prisma.gtin_upgrade_pricing.findUnique({
            where: { id: id },
        });

        if (!gtinUpgradePricing) {
            return next(createError(404, 'gtin_upgrade_pricing not found'));
        }

        res.json(gtinUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const updateGtinUpgradePricing = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error: idError } = schema.validate(req.params);

        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = gtinUpgradePricingSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { total_no_of_barcodes, price } = req.body;

        const updatedGtinUpgradePricing = await prisma.gtin_upgrade_pricing.update({
            where: { id: id },
            data: {
                total_no_of_barcodes,
                price,
            },
        });

        res.json(updatedGtinUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const deleteGtinUpgradePricing = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        await prisma.gtin_upgrade_pricing.delete({
            where: { id: id },
        });

        return res.json({ message: 'gtin_upgrade_pricing deleted successfully' });
    } catch (error) {
        next(error);
    }
};



// GLN Additional Pricing

const glnUpgradePricingSchema = Joi.object({
    total_no_of_gln: Joi.number().integer(),
    price: Joi.number().required(),
});
// Controller functions
export const createGlnUpgradePricing = async (req, res, next) => {
    try {
        const { error } = glnUpgradePricingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { total_no_of_gln, price } = req.body;

        const createdGlnUpgradePricing = await prisma.gln_upgrade_pricing.create({
            data: {
                total_no_of_gln,
                price,
            },
        });

        res.status(201).json(createdGlnUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const getAllGlnUpgradePricing = async (req, res, next) => {
    try {
        const glnUpgradePricing = await prisma.gln_upgrade_pricing.findMany({
            orderBy: {
                updated_at: 'desc',
            },
        });

        res.json(glnUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const getGlnUpgradePricingById = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const glnUpgradePricing = await prisma.gln_upgrade_pricing.findUnique({
            where: { id: id },
        });

        if (!glnUpgradePricing) {
            return next(createError(404, 'gln_upgrade_pricing not found'));
        }

        res.json(glnUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const updateGlnUpgradePricing = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error: idError } = schema.validate(req.params);

        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = glnUpgradePricingSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { total_no_of_gln, price } = req.body;

        const updatedGlnUpgradePricing = await prisma.gln_upgrade_pricing.update({
            where: { id: id },
            data: {
                total_no_of_gln,
                price,
            },
        });

        res.json(updatedGlnUpgradePricing);
    } catch (error) {
        next(error);
    }
};

export const deleteGlnUpgradePricing = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = schema.validate(req.params);

        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        await prisma.gln_upgrade_pricing.delete({
            where: { id: id },
        });

        return res.json({ message: 'gln_upgrade_pricing deleted successfully' });
    } catch (error) {
        next(error);
    }
};