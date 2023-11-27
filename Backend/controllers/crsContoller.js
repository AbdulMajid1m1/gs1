import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { serializeBigInt } from '../utils/utils.js';

// Define a validation schema for creating or updating a CR
const crsSchema = Joi.object({
    cr: Joi.string().max(255).required(),
    activity: Joi.string().max(255),
    status: Joi.number().integer().min(0).max(1),
});

export const createCrs = async (req, res, next) => {
    try {
        const { error } = crsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { cr, activity, status } = req.body;
        const createdCrs = await prisma.crs.create({
            data: {
                cr,
                activity,
                status,
            },
        });
        const serializedCrs = serializeBigInt(createdCrs);
        res.status(201).json(serializedCrs);
    } catch (error) {
        next(error);
    }
};

export const getAllCrs = async (req, res, next) => {
    try {
        const crs = await prisma.crs.findMany();
        // Serialize BigInt values in the response
        const serializedCrs = serializeBigInt(crs);

        res.json(serializedCrs);
    } catch (error) {
        next(error);
    }
};

export const getCrsById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.crs.findUnique({
            where: { id: parseInt(id) },
        });
        if (cr) {
            // Serialize BigInt values in the response
            const serializedCrs = serializeBigInt(cr);
            res.json(serializedCrs);
        } else {
            return next(createError(404, 'CR not found'));
        }
    } catch (error) {
        next(error);
    }
};

export const updateCrs = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = crsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { cr, activity, status } = req.body;
        const updatedCrs = await prisma.crs.update({
            where: { id: parseInt(id) },
            data: {
                cr,
                activity,
                status,
            },
        });
        // Serialize BigInt values in the response
        const serializedCrs = serializeBigInt(updatedCrs);
        res.json(serializedCrs);
    } catch (error) {
        next(error);
    }
};

export const deleteCrs = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.number().integer().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;
        // You can add validation for the ID here if needed
        await prisma.crs.delete({
            where: { id: parseInt(id) },
        });
        return res.json({ message: 'CR deleted successfully' });
    } catch (error) {
        next(error);
    }
};
