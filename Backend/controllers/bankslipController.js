// Import necessary modules
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { createError } from '../utils/createError.js';
import Joi from 'joi';



const prisma = new PrismaClient();


// model bank_slips {
//     id             String    @id @default(cuid())
//     transaction_id String?
//     details        String?   @db.NVarChar(Max)
//     documents      String?   @db.NVarChar(Max)
//     status         String?   @default("pending", map: "DF_bank_slips_status") @db.VarChar(10)
//     user_id        String?
//     created_at     DateTime  @default(now())
//     updated_at     DateTime  @updatedAt
//     deleted_at     DateTime? @db.DateTime
//     admin_id       String?   @default("0", map: "DF_bank_slips_admin_id") @db.VarChar(10)
//     reject_reason  String?   @db.Text
//   }

// Controller to upload a bank slip
export const uploadBankSlip = async (req, res, next) => {
    // use JOI to validate body 
    const schema = Joi.object({
        transaction_id: Joi.string().required(),
        details: Joi.string(),
        status: Joi.string().required().valid('pending', 'approved', 'rejected'),
        user_id: Joi.string().required(),
        admin_id: Joi.string(),
        reject_reason: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    try {
        const uploadedDocument = req.files.bankSlip;

        if (!uploadedDocument) {
            return next(createError(400, 'Bank slip document is required'));
        }

        const documentFile = uploadedDocument[0];
        const documentPath = path.join(documentFile.destination, documentFile.filename);
        // bankSlipDetails.documents = documentPath;

        let bankSlipData = value;
        bankSlipData.documents = documentPath;

        // Save bank slip details in the database
        const newBankSlip = await prisma.bank_slips.create({
            data: bankSlipData,
        });

        res.status(201).json(newBankSlip);
    } catch (error) {
        next(error);
    }
};
export const getBankSlipDetails = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            transaction_id: Joi.string(),
            status: Joi.string(),
            user_id: Joi.string(),
            // Add other bank slip fields here as needed for filtering
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

        // Retrieve bank slips based on filter conditions
        const bankSlips = await prisma.bank_slips.findMany({
            where: filterConditions
        });

        res.json(bankSlips);
    } catch (error) {
        next(error);
    }
};

export const updateBankSlip = async (req, res, next) => {
    try {
        const { bankSlipId } = req.params;
        const updatedDetails = req.body;

        // Check if the bank slip exists
        const existingBankSlip = await prisma.bank_slips.findUnique({
            where: { id: bankSlipId },
        });

        if (!existingBankSlip) {
            return next(createError(404, 'Bank slip not found'));
        }

        // Handle file uploads and replace old file if a new one is uploaded
        if (req.files && req.files.bankSlip) {
            const documentFile = req.files.bankSlip[0];
            const documentPath = path.join(documentFile.destination, documentFile.filename);

            // Delete the existing document
            if (existingBankSlip.documents) {
                const existingDocumentPath = path.join(__dirname, '..', existingBankSlip.documents);
                if (fs.existsSync(existingDocumentPath)) {
                    fs.unlinkSync(existingDocumentPath);
                }
            }

            // Update the document path
            updatedDetails.documents = documentPath;
        }

        // Update bank slip details in the database
        const updatedBankSlip = await prisma.bank_slips.update({
            where: { id: bankSlipId },
            data: updatedDetails,
        });

        res.json(updatedBankSlip);
    } catch (error) {
        next(error);
    }
};




export const deleteBankSlip = async (req, res, next) => {
    try {
        const schema = Joi.object({
            bankSlipId: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { bankSlipId } = value;


        // Find the bank slip to get the document path
        const bankSlip = await prisma.bank_slips.findUnique({
            where: { id: bankSlipId },
        });

        if (!bankSlip) {
            return next(createError(404, 'Bank slip not found'));
        }

        // Delete the document if it exists
        if (bankSlip.documents) {
            const documentPath = path.join(__dirname, '..', bankSlip.documents);
            if (fs.existsSync(documentPath)) {
                fs.unlinkSync(documentPath);
            }
        }

        // Delete the bank slip record from the database
        await prisma.bank_slips.delete({
            where: { id: bankSlipId },
        });

        res.json({ message: 'Bank slip deleted successfully' });
    } catch (error) {
        next(error);
    }
};