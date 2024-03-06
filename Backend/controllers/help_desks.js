import prisma from '../prismaClient.js';
import Joi from 'joi';
import
{
    createError
} from '../utils/createError.js';
import fs from 'fs/promises';
import path from 'path';
const helpdeskSchema = Joi.object({
    title: Joi.string().max(255).required(),
    email: Joi.string().max(255),

    description: Joi.string().required(),

    status: Joi.number().valid(0, 1).required(),
    user_id: Joi.string().required(),
    assignedTo: Joi.string().max(255),

});
import { sendEmail } from '../services/emailTemplates.js';
import { ADMIN_EMAIL } from '../configs/envConfig.js';
console.log(ADMIN_EMAIL);
export const getAllhelpdesk = async (req, res, next) =>
{
    try {
        const AllUNSPSC = await prisma.help_desks.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
export const gethelpdeskById = async (req, res, next) =>
{
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

        const cr = await prisma.help_desks.findUnique({
            where: {
                id: id
            },
        });
        if (!cr) {
            return next(createError(404, 'help_desks not found'));
        }
        return res.json(cr);
    } catch (error) {
        next(error);
    }
};
export const gethelpdeskByuserid = async (req, res, next) =>
{
    try {
        const schema = Joi.object({
            user_id: Joi.string().required(),
        });

        const {
            error
        } = schema.validate(req.params);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const {
            user_id
        } = req.params;

        const helpDesk = await prisma.help_desks.findMany({
            where: {
                user_id: user_id
            },
        });

        if (!helpDesk) {
            throw createError(404, 'Help desk not found');
        }

        return res.json(helpDesk);
    } catch (error) {
        next(error);
    }
};
export const deletehelpdesk = async (req, res, next) =>
{
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
        await prisma.help_desks.delete({
            where: {
                id: id
            },
        });
        return res.json({
            message: 'help_desks deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};
export const createhelpdesk = async (req, res, next) =>
{
    try {
        const {
            error,
            value
        } = helpdeskSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }

        const largestTicket = await prisma.help_desks.findFirst({
            select: {
                ticket_no: true
            },
            orderBy: {
                ticket_no: 'desc'
            }
        });

        let nextTicketNo = 1;
        if (largestTicket && largestTicket.ticket_no) {
            nextTicketNo = parseInt(largestTicket.ticket_no, 10) + 1;
        }

        value.ticket_no = nextTicketNo.toString();

        // Check if req.files and req.files.document exist
        if (req.files && req.files.document) {
            const uploadedDocument = req.files.document;
            const documentFile = uploadedDocument[0];
            const documentPath = path.join(documentFile.destination, documentFile.filename);
            const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
            value.document = imagePathWithoutPublic;
        }

        const unit = await prisma.help_desks.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};
export const updatehelp_desks = async (req, res, next) =>
{
    try {
        const helpdeskSchema = Joi.object({
            title: Joi.string().max(255).required(),
            description: Joi.string().required(),
            status: Joi.number().valid(0, 1).required(),
            assignedTo: Joi.string().max(255),
        });

        const {
            id
        } = req.params;

        const existingBankSlip = await prisma.help_desks.findUnique({
            where: {
                id: id
            },
        });

        if (!existingBankSlip) {
            return next(createError(404, 'Help desk not found'));
        }

        let imagePathWithoutPublic = existingBankSlip.document || '';

        if (req.files && req.files.document) {
            const documentFile = req.files.document[0];
            const documentPath = path.join(documentFile.destination, documentFile.filename);

            if (existingBankSlip.document) {
                const existingDocumentPath = path.join('public', existingBankSlip.document);
                try {
                    await fs.unlink(existingDocumentPath);
                } catch (unlinkError) {
                    console.error('Error deleting existing document:', unlinkError);
                }
            }

            imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
        }

        const {
            error,
            value
        } = helpdeskSchema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const updatedHelpDesk = await prisma.help_desks.update({
            where: {
                id: id
            },
            data: {
                document: imagePathWithoutPublic,
                ...value,
            },
        });

        res.json(updatedHelpDesk);
    } catch (error) {
        next(error);
    }
};
export const getAllassignto = async (req, res, next) =>
{
    try {
        const AllUNSPSC = await prisma.admins.findMany({
            where: {
                is_super_admin: 1
            }
        });


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
const helpdesk_commentSchema = Joi.object({
    helpDeskID: Joi.string(),
    comment: Joi.string(),




    commentByAdmin: Joi.string(),
    commentByUser: Joi.string(),

});
export const gethelpdesk_commentByuserid = async (req, res, next) =>
{
    try {
        const schema = Joi.object({
            helpDeskID: Joi.string().required(),
        });

        const {
            error
        } = schema.validate(req.params);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const {
            helpDeskID
        } = req.params;

        const helpDesk = await prisma.help_desk_comments.findMany({
            where: {
                helpDeskID: helpDeskID
            },
        });

        if (!helpDesk) {
            throw createError(404, 'Help desk comment not found');
        }

        return res.json(helpDesk);
    } catch (error) {
        next(error);
    }
};
export const createhelpdesk_comment = async (req, res, next) =>
{
    try {
        const {
            error,
            value
        } = helpdesk_commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }



        // Check if req.files and req.files.document exist
        if (req.files && req.files.document) {
            const uploadedDocument = req.files.document;
            const documentFile = uploadedDocument[0];
            const documentPath = path.join(documentFile.destination, documentFile.filename);
            const imagePathWithoutPublic = documentPath.replace(/^public[\\/]/, '');
            value.document = imagePathWithoutPublic;
        }

        const unit = await prisma.help_desk_comments.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};
export const sendemailAssign_to_helpdesk = async (req, res, next) =>
{
    try {
        const schema = Joi.object({
            email: Joi.string().required(),
        });

        const {
            error
        } = schema.validate(req.params);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const {
            email
        } = req.params;

        const helpDesk = await prisma.admins.findMany({
            where: {
                email: email
            },
        });
        const settings = await prisma.emailsetting.findMany();
        console.log(settings);
        if (!helpDesk) {
            throw createError(404, 'admin not found');
        }

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: email,
            subject: "HELP DESK ",

            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">Kindly check your email for helpdesk task </div>`,


        });
        return res.json(helpDesk);
    } catch (error) {
        console.log(error);
        next(error);
    }
};