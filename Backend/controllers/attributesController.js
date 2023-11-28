import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

export const getAttributesByKeyword = async (req, res, next) => {
    // use  joi to validate the keyword
    const schema = Joi.object({
        keyword: Joi.string().required(),
    });
    const { error } = schema.validate(req.params);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { keyword } = req.params;
    try {

        const attributes = await prisma.attributes.findMany({
            where: {
                OR: [
                    {
                        attributes_code: {
                            contains: keyword,
                        },
                    },
                    {
                        attributes_title: {
                            contains: keyword,
                        },
                    },
                ],
            },
        });

        if (attributes.length > 0) {
            res.json(attributes);
        } else {
            return next(createError(404, 'No matching attributes found'));
        }
    } catch (error) {
        next(error);
    }
};
