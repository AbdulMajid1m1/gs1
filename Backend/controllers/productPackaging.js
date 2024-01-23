// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

const productPackagSchema = Joi.object({
    name: Joi.string().max(255).required(),
    status: Joi.number().valid(0, 1).required(),

});

export const createProductPackag = async (req, res, next) => {
    try {
        const { error, value } = productPackagSchema.validate(req.body);
        if (error) {


            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.product_packagings.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};

export const getAllproductPackagSchema = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.product_packagings.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getproductPackagSchemaById = async (req, res, next) => {
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

        const cr = await prisma.product_packagings.findUnique({
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
export const updateproductPackagSchema = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = productPackagSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = req.body;
        const updatedUNSPSC = await prisma.product_packagings.update({
            where: { id: id },
            data: {
                name,
                status

            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteproductPackagSchema = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.product_packagings.delete({
            where: { id: id },
        });
        return res.json({ message: 'productPackag deleted successfully' });
    } catch (error) {
        next(error);
    }
};



