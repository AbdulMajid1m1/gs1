// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';

import fs from 'fs/promises';
import path from 'path';

const partners = Joi.object({
   
    link: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    
});

export const getAllpartners = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.partners.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const creatpartners = async (req, res, next) => {
 const partners = Joi.object({
   
    link: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    
});
  const { error, value } = partners.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const uploadedDocument = req.files.image;
    if (!uploadedDocument) {
      return res.status(400).json({ error: 'partners image is required' });
    }

    const documentFile = uploadedDocument[0];
    const documentPath = path.join(documentFile.destination, documentFile.filename);
const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    const sliderData = {
      image: imagePathWithoutPublic,
      ...value,
    };

    const newSlider = await prisma.partners.create({
      data: sliderData,
    });

    res.status(201).json(newSlider);
  } catch (error) {
    next(error);
  }
};
export const getpartnersById = async (req, res, next) => {
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

        const cr = await prisma.partners.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'partners services not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updatepartners = async (req, res, next) => {
  try {
 const partners = Joi.object({
   
    link: Joi.string().max(255).required(),
    status: Joi.number().valid(0,1).required(),
    
});
    const { id } = req.params;
    const existingBankSlip = await prisma.partners.findUnique({
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

    const { error, value } = partners.validate(req.body);
    
    const sliderData = {
      image: imagePathWithoutPublic,
      ...value,
    };

    const updatedBankSlip = await prisma.partners.update({
      where: { id: id },
      data: sliderData,
    });

    res.json(updatedBankSlip);
  } catch (error) {
    next(error);
  }
};
export const deletepartners = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.partners.delete({
            where: { id: id },
        });
        return res.json({ message: 'partners deleted successfully' });
    } catch (error) {
        next(error);
    }
};

