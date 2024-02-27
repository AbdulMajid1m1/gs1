import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs';
import path from 'path';
import { sendEmail } from '../services/emailTemplates.js';

// Helper function to delete old images if they exist
const deleteOldImage = (imagePath) => {
    const fullPath = path.join('public', imagePath);
    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

// Validation schema for creating and updating a gtin helper report
const gtinHelperReportSchema = Joi.object({
    report_barcode: Joi.string().max(255).required(),
    report_comment: Joi.string().max(255).required(),
    report_action: Joi.string().max(255).required(),
    // report_images field is handled by multer, so it's not validated here
    report_status: Joi.number().required(),
    reporter_email: Joi.string().email().max(50).allow(null, ''),
});

export const createGtinHelperReport = async (req, res, next) => {
    try {
        const { error, value } = gtinHelperReportSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        let imagePath = null;
        if (req.files?.report_images) {
            const image = req.files.report_images[0];
            image.destination = image.destination.replace('public/', '');
            imagePath = path.join(image.destination, image.filename);
        }

        const gtinHelperReportData = {
            ...value,
            report_images: imagePath,
        };

        const gtinHelperReport = await prisma.gtin_helper_reports.create({
            data: gtinHelperReportData,
        });

        res.status(201).json(gtinHelperReport);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getGtinHelperReports = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            report_barcode: Joi.string(),
            report_action: Joi.string(),
            report_status: Joi.number(),
            reporter_email: Joi.string().email(),
            // Add more columns as needed for filtering
        };

        // Create a dynamic schema based on the allowed columns
        const filterSchema = Joi.object(
            Object.keys(allowedColumns).reduce((schema, column) => {
                schema[column] = allowedColumns[column];
                return schema;
            }, {})
        ).unknown(false); // Disallows any keys that are not defined in the schema

        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Check if any filter conditions are provided
        const hasFilterConditions = Object.keys(value).length > 0;

        // Construct filter conditions for Prisma query
        const filterConditions = hasFilterConditions
            ? Object.keys(value).reduce((obj, key) => {
                obj[key] = value[key];
                return obj;
            }, {})
            : {};

        // Fetch gtin_helper_reports based on filter conditions
        const gtinHelperReports = await prisma.gtin_helper_reports.findMany({
            where: filterConditions,
            orderBy: { updated_at: 'desc' },
        });

        return res.json(gtinHelperReports);
    } catch (error) {
        console.log(error);
        next(error);
    }
};
export const updateGtinHelperReport = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error, value } = gtinHelperReportSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const existingReport = await prisma.gtin_helper_reports.findUnique({
            where: { id },
        });

        if (!existingReport) {
            throw createError(404, 'GTIN Helper Report not found');
        }

        let imagePath = existingReport.report_images;
        if (req.files?.report_images) {
            // Delete old image
            if (imagePath) {
                deleteOldImage(imagePath);
            }

            const image = req.files.report_images[0];
            image.destination = image.destination.replace('public/', '');
            imagePath = path.join(image.destination, image.filename);
        }

        const updatedGtinHelperReport = await prisma.gtin_helper_reports.update({
            where: { id },
            data: {
                ...value,
                report_images: imagePath,
            },
        });

        res.json(updatedGtinHelperReport);
    } catch (error) {
        next(error);
    }
};

export const deleteGtinHelperReport = async (req, res, next) => {
    try {
        const { id } = req.params;

        const report = await prisma.gtin_helper_reports.findUnique({
            where: { id },
        });

        if (!report) {
            throw createError(404, 'GTIN Helper Report not found');
        }

        // If the report has an associated image, delete it
        if (report.report_images) {
            deleteOldImage(report.report_images);
        }

        await prisma.gtin_helper_reports.delete({
            where: { id },
        });

        res.json({ message: 'GTIN Helper Report deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const emailSchema = Joi.object({
    toEmail: Joi.string().email().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
    replyToEmail: Joi.string().email().allow('').optional(),
});

export const sendEmailToGtinReporter = async (req, res) => {
    try {


        const { error, value } = emailSchema.validate(req.body);

        if (error) {
            return createError(400, `Invalid request parameters: ${error.details[0].message}`);
        }

        const { toEmail, subject, body, replyToEmail } = value;

        // Call the sendEmail function
        const emailResponse = await sendEmail({
            replyToEmail: replyToEmail, // This allows setting the reply-to address dynamically
            toEmail: toEmail,
            subject: subject,
            htmlContent: body,
            // Include attachments if needed
        });

        res.json({ success: true, message: 'Email sent successfully to GTIN reporter.', data: emailResponse });
    } catch (error) {
        console.error('Failed to send email:', error);
        res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
    }
};