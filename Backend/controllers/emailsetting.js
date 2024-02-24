import prisma from '../prismaClient.js';
import Joi from 'joi';
import {
    createError
} from '../utils/createError.js';

const emailsettingSchema = Joi.object({
    emailfrom: Joi.string().max(255).required(),
    smtp_host: Joi.string().max(255),
    emailmethod: Joi.string().required(),
    smtp_username: Joi.string().required(),
    smtp_password: Joi.string().max(255).required(),

    smtp_port: Joi.string().required(),
        smtp_encryption: Joi.string().required(),
      
    status: Joi.number().valid(0, 1).required(),
   

});
export const createemailsetting = async (req, res, next) => {
    try {
        const {
            error,
            value
        } = emailsettingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const unit = await prisma.emailsetting.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllemailsetting = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.emailsetting.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getemailsettingById = async (req, res, next) => {
    try {
        // const { id } = req.params;
        // use JOi to validate the id
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const {
            error
        } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const {
            id
        } = req.params;

        const cr = await prisma.emailsetting.findUnique({
            where: {
                id: id
            },
        });
        if (!cr) {
            return next(createError(404, 'Email Setting not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateemailsetting = async (req, res, next) => {
    try {

        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const {
            error: idError
        } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const {
            id
        } = req.params;

        const {
            error
        } = emailsettingSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const {
            emailfrom,
            smtp_host,
            emailmethod,
            smtp_username,
            status,
            smtp_password,
            smtp_port,
            smtp_encryption
        } = req.body;
        const updatedUNSPSC = await prisma.emailsetting.update({
            where: {
                id: id
            },
            data: {
               emailfrom,
               smtp_host,
               emailmethod,
               smtp_username,
               status,
               smtp_password,
               smtp_port,
               smtp_encryption

            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};

export const deleteemailsetting = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const {
            error
        } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const {
            id
        } = req.params;
        await prisma.emailsetting.delete({
            where: {
                id: id
            },
        });
        return res.json({
            message: 'Email Setting deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
