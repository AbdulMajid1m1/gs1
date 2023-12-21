import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs';
import path from 'path';
import fs1 from 'fs/promises';
import { fileURLToPath } from 'url';
import { generateGTIN13 } from '../utils/functions/barcodesGenerator.js';
import { sendEmail } from '../services/emailTemplates.js';
import QRCode from 'qrcode';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import fsSync from 'fs';
import { ADMIN_EMAIL, BACKEND_URL } from '../configs/envConfig.js';
export const createMemberDocument = async (req, res, next) => {
    // Validate body data
    const schema = Joi.object({
        type: Joi.string().required(),
        transaction_id: Joi.string().allow(''),
        user_id: Joi.string().required(),
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
    status: Joi.string(),
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



        return res.json(documents);
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




async function convertEjsToPdf(ejsFilePath, data, outputFilePath) {
    try {
        const ejsTemplate = await fs1.readFile(ejsFilePath, 'utf-8');
        const htmlContent = ejs.render(ejsTemplate, { data });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const pdfOptions = {
            path: outputFilePath,
            format: 'Letter',
            printBackground: true
        };

        await page.pdf(pdfOptions);
        await browser.close();

        return outputFilePath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}


const updateMemberDocumentStatusSchema = Joi.object({
    status: Joi.string().valid('approved', 'rejected').required(),
    reject_reason: Joi.string().optional(),
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

            return next(createError(404, 'Documents not found'));
        }


        // If the document status is approved, proceed with user status update

        // Check if the user exists
        let existingUser = await prisma.users.findUnique({ where: { id: currentDocument.user_id } });
        if (!existingUser) {
            next(createError(404, 'User not found'));
        }

        let pdfBuffer;
        let userUpdateResult;
        if (value.status === 'approved') {
            await prisma.$transaction(async (prisma) => {
                // Fetch the user ID from the member_documents table
                const userId = currentDocument.user_id;


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
                        expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());
                        console.log(expiryDate);
                        // Update user with new information
                        userUpdateResult = await prisma.users.update({
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
                const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
                let gcpGLNID = userUpdateResult.gcpGLNID;
                const CertificateData = {
                    BACKEND_URL: BACKEND_URL,
                    qrCodeDataURL: qrCodeDataURL,

                    user: {
                        company_name_eng: userUpdateResult.company_name_eng,
                    },
                    general: {
                        gcp_certificate_detail1:
                            ['Global Trade Item Number(GTIN)',
                                'Serial Shipping Container Code (SSCC)',
                                'Global Location Number (GLN)',
                                'Global Document Type Identifier(GDTI)',
                                'Global Service Relation Number(GSRN)'
                            ], // Dummy data, replace with actual detail data from your API
                        gcp_certificate_detail2: ['Global Individual Asset Identifier(GIAI)', 'Global Returnable Asset Identifier(GRAI)',
                            'Global Identification Number for',
                            'Consignment(GSNC)',
                            'Global Shipment Identification Number (GSIN)'
                        ], // Dummy data, replace with actual detail data from your API
                        gcp_legal_detail: 'Legal Detail', // Dummy data, replace with actual legal detail from your API
                    },

                    userData: {
                        // add user data here
                        gcpGLNID: gcpGLNID,
                        gln: userUpdateResult.gln,
                        companyID: userUpdateResult.companyID,
                        gcp_expiry: userUpdateResult.gcp_expiry,
                    },
                    // userUpdateResult.gcp_expiry, update this to add only date adn remove time
                    expiryDate: userUpdateResult.gcp_expiry.toISOString().split('T')[0],
                    explodeGPCCode: []
                };



                // Generate PDF from EJS template
                const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
                const pdfFilename = `Certificate-${currentDocument.transaction_id}.pdf`;
                const pdfFilePath = path.join(pdfDirectory, pdfFilename);
                if (!fsSync.existsSync(pdfDirectory)) {
                    fsSync.mkdirSync(pdfDirectory, { recursive: true });
                }

                const Certificatepath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'certificate.ejs'), CertificateData, pdfFilePath);
                pdfBuffer = await fs1.readFile(Certificatepath);

                // Send an email based on the updated status
            }, { timeout: 40000 });
            // \\uploads\\documents\\MemberRegDocs\\document-1703059737286.pdf
            console.log("existingUser", currentDocument);
            let pdfBuffer2;
            if (currentDocument.document) {
                const userDocumentPath = currentDocument.document;
                console.log("userDocupath", userDocumentPath);
                // Extract the file name
                const userDocumentName = path.basename(userDocumentPath);

                console.log(userDocumentName);

                // Construct the new path to read the file
                const newFilePath = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice', userDocumentName);

                // Read the file into a buffer

                try {
                    pdfBuffer2 = await fs1.readFile(newFilePath);
                } catch (readError) {
                    console.error('Error reading second PDF:', readError.message);
                    pdfBuffer2 = null; // Set to null if file reading fails
                }



            }



          
            // Update the document status in the database
            await sendStatusUpdateEmail(existingUser.email, value.status, value.status === 'approved' ? pdfBuffer : null, pdfBuffer2,);
            await prisma.member_documents.update({
                where: { id: documentId },
                data: { status: value.status }
            });

        }

        if (value.status === 'rejected') {
            // Set the document status to pending
            await prisma.member_documents.update({
                where: { id: documentId },
                data: { status: 'pending' }
            });

            // Delete all documents of type 'bank_slip'
            await prisma.member_documents.deleteMany({
                where: {
                    user_id: currentDocument.user_id,
                    transaction_id: currentDocument.transaction_id,
                    type: 'bank_slip',
                }
            });


            // Send email with optional reject reason
            await sendStatusUpdateEmail(existingUser.email, value.status, null, null, value.reject_reason);
            return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
        }

        return res.json({ message: 'Document status updated successfully' });
    } catch (err) {
        console.log(err);
        next(err);
    }
};


// Function to send status update email
const sendStatusUpdateEmail = async (userEmail, status, pdfBuffer, pdfBuffer2, rejectReason = '') => {
    let subject, emailContent;
    let attachments = [];
    if (status === 'approved') {
        if (pdfBuffer) {
            attachments.push({
                filename: 'certificate.pdf',
                content: pdfBuffer,
                contentType: 'application/pdf'
            });
        }
        if (pdfBuffer2) {
            attachments.push({
                filename: 'Recipient.pdf',
                content: pdfBuffer2,
                contentType: 'application/pdf'
            });
        }
    }

    switch (status) {
        case 'approved':
            subject = 'Your Gs1Ksa member Account is Now Approved';
            emailContent = '<p>Your account has been activated. You can now access all the features.</p>';
            break;
        case 'rejected':
            subject = 'Your Gs1Ksa member Account is Rejected';
            let rejectionMessage = rejectReason ? `<p>Reason for rejection: ${rejectReason}</p>` : '';
            emailContent = `<p>Your account status has been updated to: ${status}.</p>${rejectionMessage}`;
            break;
        // Add more cases for other statuses
        default:
            subject = 'Your Gs1Ksa member Account is Rejected';
            emailContent = `<p>Your account status has been updated to: ${status}.</p>`;
    }

    await sendEmail({
        fromEmail: ADMIN_EMAIL,
        toEmail: userEmail,
        subject: subject,

        htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
        // if status is approved, attach the certificate PDF
        attachments: attachments

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
