// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const countryofsaleSchema = Joi.object({
    Alpha2: Joi.string().max(255).required(),
    Alpha3: Joi.string().max(255).required(),
    country_code_numeric3: Joi.string().max(255).required(),
    country_name: Joi.string().max(255).required(),
    
});

export const createcountryofsale = async (req, res, next) => {
    try {
        const { error, value } = countryofsaleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.country_of_sales.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllcountryofsale = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.country_of_sales.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getcountryof_saleById = async (req, res, next) => {
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

        const cr = await prisma.country_of_sales.findUnique({
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
export const updatecountryofsale = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = countryofsaleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { Alpha2, Alpha3,country_code_numeric3,country_name } = req.body;
        const updatedUNSPSC = await prisma.country_of_sales.update({
            where: {id: id },
            data: {
                Alpha2,
                Alpha3,
                country_code_numeric3,
                country_name
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletecountryofsale = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.country_of_sales.delete({
            where: { id: id },
        });
        return res.json({ message: 'country of sale deleted successfully' });
    } catch (error) {
        next(error);
    }
};



