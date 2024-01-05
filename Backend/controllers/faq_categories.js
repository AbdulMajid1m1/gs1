// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
const faq_categories = Joi.object({
    name: Joi.string().max(255).required(), 
});
export const createfaq_categories = async (req, res, next) => {
    try {
        const { error, value } = faq_categories.validate(req.body);
        if (error) {
           
            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.faq_categories.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllfaq_categories = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.faq_categories.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getfaq_categoriesById = async (req, res, next) => {
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

        const cr = await prisma.faq_categories.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'faq categories not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatefaq_categories = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = faq_categories.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name} = req.body;
        const updatedUNSPSC = await prisma.faq_categories.update({
            where: {id: id },
            data: {
                name,   
                 
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletefaq_categories = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.faq_categories.delete({
            where: { id: id },
        });
        return res.json({ message: 'faq categories deleted successfully' });
    } catch (error) {
        next(error);
    }
};


