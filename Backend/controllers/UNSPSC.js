// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const UNSPSCSchema = Joi.object({
    commodity: Joi.number().required(),
    title: Joi.string().max(255).required(),
    definition: Joi.string().max(255).required(),
    addedBy: Joi.number().required(),
    
});
export const createUNSPSC = async (req, res, next) => {
    try {
        const { error, value } = UNSPSCSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.unspscs.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllUNSPSC = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.unspscs.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getUNSPSCById = async (req, res, next) => {
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

        const cr = await prisma.unspscs.findUnique({
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
export const updateUNSPSC = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = UNSPSCSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { commodity, title, definition,addedBy } = req.body;
        const updatedUNSPSC = await prisma.unspscs.update({
            where: {id: id },
            data: {
                commodity,
                title,
                definition,
                addedBy
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteUNSPSC = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.unspscs.delete({
            where: { id: id },
        });
        return res.json({ message: 'CR deleted successfully' });
    } catch (error) {
        next(error);
    }
};