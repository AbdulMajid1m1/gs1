import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { serializeBigInt } from '../utils/utils.js';

// Define a validation schema for creating or updating a CRs
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

        // Check if the combination of cr and activity already exists
        const existingCrs = await prisma.crs.findFirst({
            where: {
                cr: cr,
                activity: activity,
            },
        });

        if (existingCrs) {
            return res.status(409).json({ error: 'CR with the same crno and activity already exists' });
        }

        const createdCrs = await prisma.crs.create({
            data: {
                cr,
                activity,
                status,
            },
        });
        res.status(201).json(createdCrs);
    } catch (error) {
        next(error);
    }
};

export const getAllCrs = async (req, res, next) => {
    try {
        const crs = await prisma.crs.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(crs);
    } catch (error) {
        next(error);
    }
};

export const getCrsById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        const cr = await prisma.crs.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'CR not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};


export const getCrsByKeyword = async (req, res, next) => {
    try {
        const schema = Joi.object({
            keyword: Joi.string().required(),
        });
        const { error } = schema.validate(req.query);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { keyword } = req.query;

        const cr = await prisma.crs.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                cr: {
                                    contains: keyword,
                                },
                            },
                            {
                                activity: {
                                    contains: keyword,
                                },
                            },
                        ],
                    },
                    {
                        isRegistered: 0,
                    },
                ],
            },
        });

        if (!cr || cr.length === 0) {
            return next(createError(404, 'CR not found'));
        }

        return res.json(cr);
    } catch (error) {
        next(error);
    }
};

export const getCrsByCrNo = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            cr: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }



        const crs = await prisma.crs.findMany({
            where: {
                cr: {
                    contains: value.cr,
                },
            }

        });

        if (!crs || crs.length === 0) {
            return next(createError(404, 'CR not found'));
        }

        // this is json data.

        return res.json(crs);
    }

    catch (error) {

        next(error);

    }

};

export const updateCrs = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
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
            where: { id: id },
            data: {
                cr,
                activity,
                status,
            },
        });
        // Serialize BigInt values in the responses

        res.json(updatedCrs);
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
            where: { id: id },
        });
        return res.json({ message: 'CR deleted successfully' });
    } catch (error) {
        next(error);
    }
};
