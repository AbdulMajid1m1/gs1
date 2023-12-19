import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateGTIN13 } from '../utils/functions/barcodesGenerator.js';
import { sendEmail } from '../services/emailTemplates.js';

export const createMemberDocument = async (req, res, next) => {
    // Validate body data
    const schema = Joi.object({
        type: Joi.string().required(),
        transaction_id: Joi.string().allow(''),
        user_id: Joi.string().required(),
        admin_id: Joi.string().allow(''),
        doc_type: Joi.string().default('member_document')
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    // Get uploaded document
    const uploadedDocument = req.files.document;
    if (!uploadedDocument) {
        return next(createError(400, 'Document is required'));
    }

    const documentFile = uploadedDocument[0];
    const documentName = documentFile.filename;
    documentFile.destination = documentFile.destination.replace('public', '');
    const documentPath = path.join(documentFile.destination, documentName);

    // Save document details in the database using Prisma
    try {
        const newDocument = await prisma.member_documents.create({
            data: {
                type: value.type,
                document: documentPath,
                transaction_id: value.transaction_id,
                user_id: value.user_id,
                admin_id: value.admin_id || "",
                doc_type: value.doc_type
            }
        });

        res.status(201).json({
            message: 'Document uploaded successfully.',
            memberDocument: newDocument,
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
};


const allowedColumns = {
    id: Joi.string(),
    type: Joi.string(),
    transaction_id: Joi.string(),
    user_id: Joi.string(),
    type: Joi.string(),
    // ... other fields
};

const filterSchema = Joi.object(
    Object.keys(allowedColumns).reduce((schema, column) => {
        schema[column] = allowedColumns[column];
        return schema;
    }, {})
).unknown(false);

export const getMemberDocuments = async (req, res, next) => {
    try {
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        const filterConditions = Object.keys(value).length > 0
            ? Object.keys(value).reduce((obj, key) => {
                obj[key] = value[key];
                return obj;
            }, {})
            : {};

        const documents = await prisma.member_documents.findMany({ where: filterConditions });
        res.json(documents);
    } catch (error) {
        next(error);
    }
};


export const getMemberFinanceDocuments = async (req, res, next) => {
    try {
        // Validate the query parameters
        // const { error, value } = filterSchema.validate(req.query);
        const schema = Joi.object({
            user_id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.query);

        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Build filter conditions with user ID and type
        const filterConditions = {
            user_id: value.user_id || "",
            type: {
                in: ['bank_slip', 'invoice']
            }
        };

        // Fetch documents based on the filter conditions
        const documents = await prisma.member_documents.findMany({ where: filterConditions });

        // Combine and map documents based on transaction ID
        const combinedDocs = {};
        documents.forEach(doc => {
            const key = doc.transaction_id;
            if (!combinedDocs[key]) {
                combinedDocs[key] = { bankSlipDocument: null, invoiceDocument: null };
            }
            if (doc.type === 'bank_slip') {
                combinedDocs[key].bankSlipDocument = doc.document;
            } else if (doc.type === 'invoice') {
                combinedDocs[key].invoiceDocument = doc.document;
            }
        });

        // Optional: Format combinedDocs into desired structure

        res.json(combinedDocs);
    } catch (error) {
        next(error);
    }
};


const updateMemberDocumentSchema = Joi.object({
    type: Joi.string().max(255), // Assuming a string with max length 255
    document: Joi.string(),      // This will be the path of the document
    transaction_id: Joi.string().max(255).allow(''), // Allowing empty string
    user_id: Joi.string(),   // Assuming user_id is a positive integer
    admin_id: Joi.string(),  // Assuming admin_id is a positive integer
    doc_type: Joi.string().max(20).default('member_document'), // Assuming max length 20 and default value
    status: Joi.string().valid('pending', 'approved', 'rejected'),


});


export const updateMemberDocument = async (req, res, next) => {
    const documentId = req.params.id;
    if (!documentId) {
        return next(createError(400, 'Document ID is required'));
    }

    // Validate the request body
    const { error, value } = updateMemberDocumentSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        // Retrieve the current document from the database
        const currentDocument = await prisma.member_documents.findUnique({
            where: { id: documentId }
        });

        if (!currentDocument) {
            return next(createError(404, 'Document not found'));
        }

        // Check for a new document upload
        if (req.files && req.files.document) {
            const documentFile = req.files.document[0];
            const newDocumentPath = path.join(documentFile.destination, documentFile.filename);

            // Calculate the directory of the current module
            const dirname = path.dirname(fileURLToPath(import.meta.url));
            const oldDocumentPath = path.join(dirname, '..', currentDocument.document);

            if (fs.existsSync(oldDocumentPath)) {
                fs.unlinkSync(oldDocumentPath);
            }

            // Update the document path in the value to be saved
            value.document = newDocumentPath;
        }

        // Update the document in the database
        const updatedDocument = await prisma.member_documents.update({
            where: { id: documentId },
            data: value
        });

        res.json(updatedDocument);
    } catch (err) {
        next(err);
    }
};


const updateMemberDocumentStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'approved', 'rejected').required(),

});


export const updateMemberDocumentStatus = async (req, res, next) => {
    const documentId = req.params.id;
    if (!documentId) {
        return next(createError(400, 'Document ID is required'));
    }

    // Validate the request body
    const { error, value } = updateMemberDocumentStatusSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        // Retrieve the current document from the database
        const currentDocument = await prisma.member_documents.findFirst({
            where: { id: documentId }
        });

        if (!currentDocument) {
            console.log('Document not found');
            console.log(currentDocument);
            console.log(documentId);
            return next(createError(404, 'Documents not found'));
        }


        // If the document status is approved, proceed with user status update
        if (value.status === 'approved') {
            await prisma.$transaction(async (prisma) => {
                // Fetch the user ID from the member_documents table
                const userId = currentDocument.user_id;

                // Check if the user exists
                const existingUser = await prisma.users.findUnique({ where: { id: userId } });
                if (!existingUser) {
                    throw createError(404, 'User not found');
                }

                // Perform the updateUserStatus logic
                const cart = await prisma.carts.findFirst({ where: { user_id: userId } });

                if (cart && cart.cart_items) {
                    const cartItems = JSON.parse(cart.cart_items);
                    const firstCartItem = cartItems[0];
                    const product = await prisma.gtin_products.findUnique({
                        where: { id: firstCartItem.productID }
                    });

                    if (product) {
                        // Generate gcpGLNID and GLN
                        const gcpGLNID = `628${product.gcp_start_range}`;
                        const gln = generateGTIN13(gcpGLNID);

                        // Calculate expiry date (1 year from now)
                        let expiryDate = new Date();
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                        // Update user with new information
                        const userUpdateResult = await prisma.users.update({
                            where: { id: userId },
                            data: {
                                gcpGLNID: gcpGLNID,
                                gln: gln,
                                gcp_expiry: expiryDate,
                                remarks: 'Registered',
                                payment_status: 1,
                                status: 'active'
                            }
                        });

                        // Update GTIN subscriptions for the user
                        await prisma.gtin_subcriptions.updateMany({
                            // update based on the transaction ID
                            where: { transaction_id: currentDocument.transaction_id },
                            data: {
                                status: 'active',
                                expiry_date: expiryDate
                            }
                        });

                        await prisma.gtin_products.update({
                            where: { id: product.id },
                            data: { gcp_start_range: (parseInt(product.gcp_start_range) + 1).toString() }
                        });

                        // Fetch and update TblSysCtrNo
                        const tblSysNo = await prisma.tblSysNo.findFirst();
                        if (tblSysNo) {
                            await prisma.users.update({
                                where: { id: userId },
                                data: {
                                    companyID: tblSysNo.TblSysCtrNo,
                                    memberID: tblSysNo.TblSysCtrNo,
                                }
                            });

                            await prisma.tblSysNo.update({
                                where: { SysNoID: tblSysNo.SysNoID },
                                data: { TblSysCtrNo: (parseInt(tblSysNo.TblSysCtrNo) + 1).toString() }
                            });
                        }
                    }
                }



                // Send an email based on the updated status
                await sendStatusUpdateEmail(existingUser.email, 'active');
            }, { timeout: 40000 });

        }

        res.json({ message: 'Document status updated successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};


// Function to send status update email
const sendStatusUpdateEmail = async (userEmail, status) => {
    let subject, emailContent;

    switch (status) {
        case 'active':
            subject = 'Your Gs1Ksa member Account is Now Active';
            emailContent = '<p>Your account has been activated. You can now access all the features.</p>';
            break;
        case 'inactive':
            subject = 'Your Gs1Ksa member Account is Inactive';
            emailContent = '<p>Your account is currently inactive. Please contact support for more details.</p>';
            break;
        // Add more cases for other statuses
        default:
            subject = 'Your Gs1Ksa member Account Status Updated';
            emailContent = `<p>Your account status has been updated to: ${status}.</p>`;
    }

    await sendEmail({
        toEmail: userEmail,
        subject: subject,
        htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`
    });
};



export const deleteMemberDocument = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const documentId = value.id;

    try {
        await prisma.member_documents.delete({ where: { id: documentId } });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
