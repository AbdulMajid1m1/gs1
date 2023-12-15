// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const otherProductSchema = Joi.object({
    product_name: Joi.string().max(255).required(),
    total_no_of_barcodes: Joi.number().required(),
    product_subscription_fee: Joi.number().required(),
    code: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    med_subscription_fee: Joi.number().required(),
    variant: Joi.string().max(255).required(),
    
});

export const createotherproduct = async (req, res, next) => {
    try {
        const { error, value } = otherProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const unit = await prisma.other_products.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllotherproduct = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.other_products.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getotherproductById = async (req, res, next) => {
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

        const cr = await prisma.other_products.findUnique({
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
export const updateotherproduct = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = otherProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { product_name, total_no_of_barcodes, product_subscription_fee, code,status,med_subscription_fee,variant } = req.body;
        const updatedUNSPSC = await prisma.other_products.update({
            where: {id: id },
            data: {
                product_name,
                total_no_of_barcodes,
                code,
                status,
                med_subscription_fee,
                variant,
                product_subscription_fee
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deleteotherproduct = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.other_products.delete({
            where: { id: id },
        });
        return res.json({ message: 'Other_product deleted successfully' });
    } catch (error) {
        next(error);
    }
};




