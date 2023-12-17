// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';



const documentSchema = Joi.object({
    name: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    
});
const document_typesSchema = Joi.object({
    file_name: Joi.string().max(255).required(),
    status: Joi.string().max(255).required(),
    
});
export const createdocument = async (req, res, next) => {
    try {
        const { error, value } = documentSchema.validate(req.body);
        if (error) {
            

            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.cr_documents.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAllcr_documents = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.cr_documents.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getcr_documentsById = async (req, res, next) => {
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

        const cr = await prisma.cr_documents.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'documents not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatecr_documents = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = documentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, status } = req.body;
        const updatedUNSPSC = await prisma.cr_documents.update({
            where: {id: id },
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
export const deletecr_documents = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.cr_documents.delete({
            where: { id: id },
        });
        return res.json({ message: 'documents deleted successfully' });
    } catch (error) {
        next(error);
    }
};
//----------------DOCUMENTTYPE-----------------------------------
export const createdocumentType = async (req, res, next) => {
    try {
        const { error, value } = document_typesSchema.validate(req.body);
        if (error) {
            

            return res.status(400).json({ error: error.details[0].message });
        }

        const unit = await prisma.document_type.create({
            data: value,
        });

        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};
export const getAlldocumentType = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.document_type.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const getdocumentTypeById = async (req, res, next) => {
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

        const cr = await prisma.document_type.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'documents not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatedocumentType = async (req, res, next) => {
    try {

      const schema = Joi.object({
    id: Joi.string().required(),
});
const { error: idError } = schema.validate(req.params);
if (idError) {
    return next(createError(400, idError.details[0].message));
}

const { id } = req.params;

        const { error } = document_typesSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { file_name, status } = req.body;
        const updatedUNSPSC = await prisma.document_type.update({
            where: {id: id },
            data: {
                file_name,
                status
                
            },
        });

        res.json(updatedUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const deletedocumentType = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.document_type.delete({
            where: { id: id },
        });
        return res.json({ message: 'documents deleted successfully' });
    } catch (error) {
        next(error);
    }
};

