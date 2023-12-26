
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';


export const searchGpc = async (req, res, next) => {

    const schema = Joi.object({
        term: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.query);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const { term } = value;

    const attributes = await prisma.attributes.findMany({
        where: {
            OR: [
                { attributes_code: { contains: term } },
                { attributes_title: { contains: term } }
            ]
        }
    });
    const attributesArray = attributes.map(attr => ({
        value: `${attr.attributes_code}-${attr.attributes_title}`,
        gpcCode: attr.attributes_code
    }));

    const families = await prisma.families.findMany({
        where: {
            OR: [
                { family_code: { contains: term } },
                { family_title: { contains: term } }
            ]
        }
    });
    const familiesArray = families.map(fam => ({
        value: `${fam.family_code}-${fam.family_title}`,
        gpcCode: fam.family_code
    }));

    const bricks = await prisma.bricks.findMany({
        where: {
            OR: [
                { bricks_code: { contains: term } },
                { bricks_title: { contains: term } }
            ]
        }
    });
    const bricksArray = bricks.map(brick => ({
        value: `${brick.bricks_code}-${brick.bricks_title}`,
        gpcCode: brick.bricks_code
    }));

    const gpcClasses = await prisma.gpc_classes.findMany({
        where: {
            OR: [
                { class_code: { contains: term } },
                { class_title: { contains: term } }
            ]
        }
    });
    const gpcClassesArray = gpcClasses.map(gpcClass => ({
        value: `${gpcClass.class_code}-${gpcClass.class_title}`,
        gpcCode: gpcClass.class_code
    }));

    const segments = await prisma.segments.findMany({
        where: {
            OR: [
                { segment_code: { contains: term } },
                { segment_title: { contains: term } }
            ]
        }
    });
    const segmentsArray = segments.map(segment => ({
        value: `${segment.segment_code}-${segment.segment_title}`,
        gpcCode: segment.segment_code
    }));

    // Combine and format the results
    const combinedResults = [...attributesArray, ...familiesArray, ...bricksArray, ...gpcClassesArray, ...segmentsArray];


    res.json(combinedResults);
}

