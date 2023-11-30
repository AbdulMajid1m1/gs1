import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



export const getAllgtinProducts = async (req, res, next) => {
    try {
        const gtinProducts = await prisma.gtin_products.findMany(
            {
                where: {
                    status: 1,
                },
            }

        );

        res.json(gtinProducts);
    } catch (error) {
        next(error);
    }
};