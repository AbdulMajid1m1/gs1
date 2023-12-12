// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const HsCodeSchema = Joi.object({
    CNKEY: Joi.string().max(255).required(),
    HSCODES: Joi.string().max(255).required(),
    DescriptionEN: Joi.string().max(255).required(),
    addBy: Joi.number().required(),
    
});

export const createHsCode = async (req, res, next) => {
    try {
        const { error, value } = HsCodeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.hs_codes.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};

export const getAllHsCode = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.hs_codes.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getHsCodeById = async (req, res, next) => {
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

        const cr = await prisma.hs_codes.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'products not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateHsCode = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = HsCodeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { CNKEY, HSCODES,DescriptionEN,addBy } = req.body;
        const updatedUNSPSC = await prisma.hs_codes.update({
            where: {id: id },
            data: {
                CNKEY,
                HSCODES,
                DescriptionEN,
                addBy
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteHsCode = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.hs_codes.delete({
            where: { id: id },
        });
        return res.json({ message: 'HsCode deleted successfully' });
    } catch (error) {
        next(error);
    }
};



