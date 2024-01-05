// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs/promises';
import path from 'path';


const our_teams = Joi.object({
    name: Joi.string().max(255).required(),
    job_title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    
    addedBy: Joi.number().required(), 
    status: Joi.number().valid(0,1).required(),
    
});

export const getAllour_teams = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.our_teams.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const creatour_teams = async (req, res, next) => {
  const our_teams = Joi.object({
    name: Joi.string().max(255).required(),
    job_title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    addedBy: Joi.number().required(), 
    status: Joi.number().valid(0,1).required(),
    
});

  const { error, value } = our_teams.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const uploadedDocument = req.files.image;
    if (!uploadedDocument) {
      return res.status(400).json({ error: 'our teams image is required' });
    }

    const documentFile = uploadedDocument[0];
    const documentPath = path.join(documentFile.destination, documentFile.filename);
const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    const sliderData = {
      image: imagePathWithoutPublic,
      ...value,
    };

    const newSlider = await prisma.our_teams.create({
      data: sliderData,
    });

    res.status(201).json(newSlider);
  } catch (error) {
    next(error);
  }
};
export const getour_teamsById = async (req, res, next) => {
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

        const cr = await prisma.our_teams.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'our teams not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateour_teams = async (req, res, next) => {
  try {
  const our_teams = Joi.object({
    name: Joi.string().max(255).required(),
    job_title: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
  
    addedBy: Joi.number().required(), 
    status: Joi.number().valid(0,1).required(),
    
});
    const { id } = req.params;
    const existingBankSlip = await prisma.our_teams.findUnique({
      where: { id: id },
    });

    if (!existingBankSlip) {
      return next(createError(404, 'image not found'));
    }

    let imagePathWithoutPublic = existingBankSlip.image || '';

    if (req.files && req.files.image) {
      const documentFile = req.files.image[0];
      const documentPath = path.join(documentFile.destination, documentFile.filename);

      if (existingBankSlip.image) {
        const existingDocumentPath = path.join(existingBankSlip.image);
        try {
          await fs.unlink(existingDocumentPath);
        } catch (unlinkError) {
          console.error('Error deleting existing image:', unlinkError);
        }
      }

      imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    }

    const { error, value } = our_teams.validate(req.body);
    
    const sliderData = {
      image: imagePathWithoutPublic,
      ...value,
    };

    const updatedBankSlip = await prisma.our_teams.update({
      where: { id: id },
      data: sliderData,
    });

    res.json(updatedBankSlip);
  } catch (error) {
    next(error);
  }
};
export const deleteour_teams = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.our_teams.delete({
            where: { id: id },
        });
        return res.json({ message: 'our teams deleted successfully' });
    } catch (error) {
        next(error);
    }
};

