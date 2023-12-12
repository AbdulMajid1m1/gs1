// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const gpc_typeSchema = Joi.object({
    gcp_code: Joi.string().max(255).required(),
    gcp_description: Joi.string().max(255).required(),
    
});

export const creategpctype = async (req, res, next) => {
    try {
        const { error, value } = gpc_typeSchema.validate(req.body);
        if (error) {
            

            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.gcp_types.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllgpctype = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.gcp_types.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getgpctypeById = async (req, res, next) => {
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

        const cr = await prisma.gcp_types.findUnique({
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
export const updategpctype = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = gpc_typeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { gcp_code, gcp_description } = req.body;
        const updatedUNSPSC = await prisma.gcp_types.update({
            where: {id: id },
            data: {
                gcp_code,
                gcp_description,
                
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletegpctype = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.gcp_types.delete({
            where: { id: id },
        });
        return res.json({ message: 'gpctype deleted successfully' });
    } catch (error) {
        next(error);
    }
};



