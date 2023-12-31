import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const mega_menus = Joi.object({
    name_en: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255).required(),
    status: Joi.number().required(),   
});
export const getAllmega_menu = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.mega_menus.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const createmega_menus = async (req, res, next) => {
    try {
        const { error, value } = mega_menus.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.mega_menus.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getmega_menusById = async (req, res, next) => {
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

        const cr = await prisma.mega_menus.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'mega_menus not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatemega_menus = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = mega_menus.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name_en, name_ar,status } = req.body;
        const updatedUNSPSC = await prisma.mega_menus.update({
            where: {id: id },
            data: {
                name_en,
                name_ar,
                status
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletemega_menus = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.mega_menus.delete({
            where: { id: id },
        });
        return res.json({ message: 'mega menus deleted successfully' });
    } catch (error) {
        next(error);
    }
};