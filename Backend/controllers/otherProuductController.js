import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



export const getAllOtherProducts = async (req, res, next) => {
    try {
        const otherProducts = await prisma.other_products.findMany(
            {
                where: {
                    status: 1,
                },
            }

        );

        res.json(otherProducts);
    } catch (error) {
        console.log(error)
        next(error);
    }
};