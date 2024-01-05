import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs/promises';
import path from 'path';

const user_guide_pdfs = Joi.object({
    title: Joi.string().max(255).required(),
    pdf: Joi.string().max(255).required(),
    status: Joi.number().required(), 
     addedBy: Joi.number().required()
});

export const getAlluser_guide_pdfs = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.user_guide_pdfs.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const creatuser_guide_pdfs = async (req, res, next) => {
  const user_guide_pdfs = Joi.object({
    title: Joi.string().max(255).required(),
      // Corrected field name to 'pdf'
    status: Joi.number().required(),
    addedBy: Joi.number().required(),
  });
    
  const { error, value } = user_guide_pdfs.validate(req.body);

  if (error) {
  
      return res.status(400).json({ error: error.message });
  }

  try {
      const uploadedDocument = req.files.pdf;
   
    if (!uploadedDocument) {
      return res.status(400).json({ error: 'user guide pdfs is required' });
    }

    const documentFile = uploadedDocument[0];
    const documentPath = path.join(documentFile.destination, documentFile.filename);
    const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    const sliderData = {
      pdf: imagePathWithoutPublic,  // Use the correct field name 'pdf'
      ...value,
    };

    const newSlider = await prisma.user_guide_pdfs.create({
      data: sliderData,
    });

    res.status(201).json(newSlider);
  } catch (error) {
    next(error);
  }
};
export const getuser_guide_pdfsById = async (req, res, next) => {
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

        const cr = await prisma.user_guide_pdfs.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'user guide pdfs not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateuser_guide_pdfs = async (req, res, next) => {
  try {
 const user_guide_pdfs = Joi.object({
    title: Joi.string().max(255).required(),
  
    status: Joi.number().required(), 
     addedBy: Joi.number().required()
});

    const { id } = req.params;
    const existingBankSlip = await prisma.user_guide_pdfs.findUnique({
      where: { id: id },
    });

    if (!existingBankSlip) {
      return next(createError(404, 'pdf not found'));
    }

    let imagePathWithoutPublic = existingBankSlip.pdf || '';

    if (req.files && req.files.pdf) {
      const documentFile = req.files.pdf[0];
      const documentPath = path.join(documentFile.destination, documentFile.filename);

      if (existingBankSlip.pdf) {
        const existingDocumentPath = path.join(existingBankSlip.pdf);
        try {
          await fs.unlink(existingDocumentPath);
        } catch (unlinkError) {
          console.error('Error deleting existing pdf:', unlinkError);
        }
      }

      imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    }

    const { error, value } = user_guide_pdfs.validate(req.body);
    
    const sliderData = {
      pdf: imagePathWithoutPublic,
      ...value,
    };

    const updatedBankSlip = await prisma.user_guide_pdfs.update({
      where: { id: id },
      data: sliderData,
    });

    res.json(updatedBankSlip);
  } catch (error) {
    next(error);
  }
};
export const deleteuser_guide_pdfs = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.user_guide_pdfs.delete({
            where: { id: id },
        });
        return res.json({ message: 'user guide pdfs deleted successfully' });
    } catch (error) {
        next(error);
    }
};
const user_guide_videos = Joi.object({
    title: Joi.string().max(255).required(),
    video: Joi.string().max(255).required(),
    status: Joi.number().required(), 
     addedBy: Joi.number().required()
});
export const getAlluser_guide_videos = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.user_guide_videos.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const creatuser_guide_videos = async (req, res, next) => {
  const user_guide_videos = Joi.object({
    title: Joi.string().max(255).required(),
   
    status: Joi.number().required(), 
     addedBy: Joi.number().required()
});
    
  const { error, value } = user_guide_videos.validate(req.body);

  if (error) {
  
      return res.status(400).json({ error: error.message });
  }

  try {
      const uploadedDocument = req.files.video;
   
    if (!uploadedDocument) {
      return res.status(400).json({ error: 'user guide videos is required' });
    }

    const documentFile = uploadedDocument[0];
    const documentPath = path.join(documentFile.destination, documentFile.filename);
    const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    const sliderData = {
      video: imagePathWithoutPublic,  // Use the correct field name 'video'
      ...value,
    };

    const newSlider = await prisma.user_guide_videos.create({
      data: sliderData,
    });

    res.status(201).json(newSlider);
  } catch (error) {
    next(error);
  }
};
export const getuser_guide_videosById = async (req, res, next) => {
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

        const cr = await prisma.user_guide_videos.findUnique({
            where: { id: id },
        });
        if (!cr) {
            return next(createError(404, 'user guide video not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const updateuser_guide_videos = async (req, res, next) => {
  try {
const user_guide_videos = Joi.object({
    title: Joi.string().max(255).required(),
   
    status: Joi.number().required(), 
     addedBy: Joi.number().required()
});

    const { id } = req.params;
    const existingBankSlip = await prisma.user_guide_videos.findUnique({
      where: { id: id },
    });

    if (!existingBankSlip) {
      return next(createError(404, 'video not found'));
    }

    let imagePathWithoutPublic = existingBankSlip.video || '';

    if (req.files && req.files.video) {
      const documentFile = req.files.video[0];
      const documentPath = path.join(documentFile.destination, documentFile.filename);

      if (existingBankSlip.video) {
        const existingDocumentPath = path.join(existingBankSlip.video);
        try {
          await fs.unlink(existingDocumentPath);
        } catch (unlinkError) {
          console.error('Error deleting existing video:', unlinkError);
        }
      }

      imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
    }

    const { error, value } = user_guide_videos.validate(req.body);
    
    const sliderData = {
      video: imagePathWithoutPublic,
      ...value,
    };

    const updatedBankSlip = await prisma.user_guide_videos.update({
      where: { id: id },
      data: sliderData,
    });

    res.json(updatedBankSlip);
  } catch (error) {
    next(error);
  }
};
export const deleteuser_guide_videos = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { id } = req.params;
        await prisma.user_guide_pdfs.delete({
            where: { id: id },
        });
        return res.json({ message: 'user guide pdfs deleted successfully' });
    } catch (error) {
        next(error);
    }
};