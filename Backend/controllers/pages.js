// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const pages = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255).required(),
    slug: Joi.string().max(255).required(),
    page_order: Joi.number(),
    sections: Joi.string().max(255).required(),
    custom_section_data: Joi.string().max(255).required(),
    seo_description: Joi.string().max(255).required(),
    is_dropdown: Joi.number(),
    
    status: Joi.number().valid(0,1).required(),
    
});

export const createpages = async (req, res, next) => {
    try {
        const { error, value } = pages.validate(req.body);
        if (error) {
           
            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.pages.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};


export const getAllpages = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.pages.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getpagesById = async (req, res, next) => {
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

        const cr = await prisma.pages.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'pages not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatepages = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = pages.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, name_ar,slug,page_order,sections,custom_section_data,seo_description,is_dropdown, status } = req.body;
        const updatedUNSPSC = await prisma.pages.update({
            where: {id: id },
            data: {
                name,
                name_ar,
                slug,
                page_order,
                sections,
                custom_section_data,
                seo_description,
                is_dropdown,
                status
               
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletepages = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.pages.delete({
            where: { id: id },
        });
        return res.json({ message: 'pages deleted successfully' });
    } catch (error) {
        next(error);
    }
};


