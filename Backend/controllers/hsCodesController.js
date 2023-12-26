import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

export const searchHsCodes = async (req, res, next) => {
    // Validation schema
    const schema = Joi.object({
        term: Joi.string().required(),
    });

    // Validate request
    const { error, value } = schema.validate(req.query);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    // Extract term
    const { term } = value;

    try {
        // Perform the search
        const hsCodes = await prisma.hs_codes.findMany({
            where: {
                OR: [
                    { DescriptionEN: { contains: term } },
                    { HSCODES: { contains: term } }
                ]
            },
            take: 30 // pagination limit
        });
        
        // Format the results
        const formattedHsCodes = hsCodes.map(code => ({
            value: code.DescriptionEN,
            HSID: code.id,
            DescriptionEN: `${code.HSCODES} - ${code.DescriptionEN}`,
            HSCODES: code.HSCODES
        }));

        // Send the response
        res.json(formattedHsCodes);
    } catch (error) {
        console.error(error);
        next(createError(500, 'Internal Server Error'));
    }
};
