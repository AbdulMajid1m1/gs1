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

import fsSync from 'fs';
import { ADMIN_EMAIL, BACKEND_URL } from '../configs/envConfig.js';
import { createMemberLogs } from '../utils/functions/historyLogs.js';
import { convertEjsToPdf } from '../utils/functions/commonFunction.js';
import { updateUserPendingInvoiceStatus } from '../utils/functions/apisFunctions.js';
export const createMemberDocument = async (req, res, next) => {
    // Validate body data
    const schema = Joi.object({
        type: Joi.string().required(),
        transaction_id: Joi.string().allow(''),
        user_id: Joi.string().required(),
        doc_type: Joi.string().default('member_document'),
        uploaded_by: Joi.string(),
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



        // Insert Member History log
        const logData = {
            // TODO: check if it uploaded by admin or user. cehck if req.admin exist then use req.admin.email else use req.user.email
            subject: `${value.type} Document Uploaded by ${value.uploaded_by}`,
            // user user memberId
            // member_id: value.memberID,
            user_id: value.user_id,
            // TODO: add middleware for current admin token 
        }
        TODO: // chec this
        // if (req?.admin.id) {
        //     logData.admin_id = admin_email;
        // logData.created_by_admin = 1;
        // }

        await createMemberLogs(logData);


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
const invoiceSchema = Joi.object({
    user_id: Joi.string().required(),
});
export const getMemberInvoices = async (req, res, next) => {
    try {
        const { error, value } = invoiceSchema.validate(req.query);

        if (error) {
            throw createError(400, `Invalid query parameter: ${error.details[0].message}`);
        }

        const documents = await prisma.member_documents.findMany({
            where: {
                AND: [
                    { user_id: value.user_id },
                    {
                        OR: [
                            { type: 'invoice' },
                            { type: 'migration_invoice' },
                            { type: 'renewal_invoice' },
                            { type: 'upgrade_invoice' },
                            { type: 'downgrade_invoice' },
                            { type: "additional_gln_invoice" },
                            { type: "additional_gtin_invoice" },
                        ]
                    }
                ]
            }
        });

        res.json(documents);
    } catch (error) {
        console.error(error);
        next(error);
    }
};
export const getMemberPendingInvoices = async (req, res, next) => {
    try {
        const { error, value } = invoiceSchema.validate(req.query);

        if (error) {
            throw createError(400, `Invalid query parameter: ${error.details[0].message}`);
        }

        const documents = await prisma.member_documents.findMany({
            where: {
                AND: [
                    { user_id: value.user_id },
                    {
                        OR: [
                            { type: 'invoice' },
                            { type: 'renewal_invoice' },
                            { type: 'migration_invoice' },
                            { type: 'upgrade_invoice' },
                            { type: 'downgrade_invoice' },
                            { type: "additional_gln_invoice" },
                            { type: "additional_gtin_invoice" },
                        ]
                    },

                    { status: 'pending' }
                ]
            }
        });

        res.json(documents);
    } catch (error) {
        console.error(error);
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






const updateMemberDocumentStatusSchema = Joi.object({
    status: Joi.string().valid('approved', 'rejected').required(),
    reject_reason: Joi.string().optional(),
    migration: Joi.boolean().default(false),
});

export const updateMemberDocumentStatus = async (req, res, next) => {

    // Validate the request body
    const { error, value } = updateMemberDocumentStatusSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {

        const documentId = req.params.id;
        if (!documentId) {
            throw createError(400, 'Document ID is required');
        }

        // Retrieve the current document from the database
        const currentDocument = await prisma.member_documents.findFirst({
            where: { id: documentId }
        });

        if (!currentDocument) {
            throw createError(404, 'Document not found');
        }


        // If the document status is approved, proceed with user status update

        // Check if the user exists
        let existingUser = await prisma.users.findUnique({ where: { id: currentDocument.user_id } });
        if (!existingUser) {
            throw createError(404, 'User not found');
        }

        let pdfBuffer;
        let userUpdateResult;
        let pdfFilename;
        let cart;

        const bankSlipDocuments = await prisma.member_documents.findMany({
            where: {
                user_id: currentDocument.user_id,
                transaction_id: currentDocument.transaction_id,
                type: 'bank_slip',
            }
        });
        if (bankSlipDocuments.length === 0) {
            return next(createError(400, `No bank slip documents found for the transaction ID: ${currentDocument.transaction_id}`));
        }


        if (value.status === 'approved') {
            await prisma.$transaction(async (prisma) => {
                // Fetch the user ID from the member_documents table
                const userId = currentDocument.user_id;


                // Perform the updateUserStatus logic
                cart = await prisma.carts.findFirst({ where: { user_id: userId } });

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
                                expiry_date: expiryDate,
                                gtin_subscription_limit: product.total_no_of_barcodes,
                                gtin_subscription_total_price: product.gtin_yearly_subscription_fee,

                            }
                        });

                        // Fetch the necessary data from other_products table
                        const products = await prisma.other_products.findMany({
                            select: {
                                id: true,
                                total_no_of_barcodes: true,
                                product_subscription_fee: true,
                                med_subscription_fee: true,
                            }
                        });

                        // Update other_products_subcriptions table for each product
                        for (const product of products) {
                            console.log("product", product);
                            let subscriptionFee = userUpdateResult.membership_category === 'non_med_category'
                                ? product.product_subscription_fee
                                : product.med_subscription_fee;

                            await prisma.other_products_subcriptions.updateMany({
                                where: {
                                    product_id: product.id,
                                    isDeleted: false,
                                    transaction_id: currentDocument.transaction_id // if you want to update only those records that match the transaction_id
                                },
                                data: {
                                    other_products_subscription_limit: product.total_no_of_barcodes,
                                    other_products_subscription_total_price: subscriptionFee,
                                    status: 'active',  // Update the status
                                    expiry_date: expiryDate // Update the expiry date
                                }
                            });
                        }


                        // update isRegistered in crs to 1 by  cr_number and cr_activity
                        await prisma.crs.updateMany({
                            where: {
                                cr: existingUser.cr_number,
                                activity: existingUser.cr_activity
                            },
                            data: {
                                isRegistered: 1
                            }
                        });

                        await prisma.gtin_products.update({
                            where: { id: product.id },
                            data: { gcp_start_range: (parseInt(product.gcp_start_range) + 1).toString() }
                        });

                        // Fetch and update TblSysCtrNo
                        const tblSysNo = await prisma.tblSysNo.findFirst();
                        if (tblSysNo) {
                            userUpdateResult = await prisma.users.update({
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
                let gcpGLNID = userUpdateResult?.gcpGLNID;
                const CertificateData = {
                    BACKEND_URL: BACKEND_URL,
                    qrCodeDataURL: qrCodeDataURL,

                    user: {
                        company_name_eng: userUpdateResult?.company_name_eng,
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
                        gln: userUpdateResult?.gln,
                        memberID: userUpdateResult?.memberID,
                        gcp_expiry: userUpdateResult?.gcp_expiry,
                    },
                    // userUpdateResult.gcp_expiry, update this to add only date adn remove time
                    expiryDate: userUpdateResult?.gcp_expiry.toISOString().split('T')[0],
                    explodeGPCCode: []
                };

                console.log("userUpdateResult")
                console.log(userUpdateResult)

                // Generate PDF from EJS template
                const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
                pdfFilename = `${userUpdateResult.company_name_eng}-Certificate.pdf`;
                const pdfFilePath = path.join(pdfDirectory, pdfFilename);
                if (!fsSync.existsSync(pdfDirectory)) {
                    fsSync.mkdirSync(pdfDirectory, { recursive: true });
                }

                const Certificatepath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'certificate.ejs'), CertificateData, pdfFilePath, true);
                pdfBuffer = await fs1.readFile(Certificatepath);

                // Send an email based on the updated status
            }, { timeout: 40000 });
            // \\uploads\\documents\\MemberRegDocs\\document-1703059737286.pdf
            console.log("existingUser", currentDocument);
            let cartData = JSON.parse(cart.cart_items);
            cart.cart_items = cartData
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const data1 = {
                topHeading: "RECEIPT",
                secondHeading: "RECEIPT FOR",
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,
                    registeration: `New Registration`,
                    // Assuming $addMember->id is already known
                    company_name_eng: existingUser.company_name_eng,
                    mobile: existingUser.mobile,
                    address: {
                        zip: existingUser.zip_code,
                        countryName: existingUser.country,
                        stateName: existingUser.state,
                        cityName: existingUser.city,
                    },
                    companyID: userUpdateResult?.companyID,
                    membership_otherCategory: existingUser.membership_category,
                    gtin_subscription: {
                        products: {
                            member_category_description: cartData[0].productName,
                        },
                    },
                },


                cart: cart,

                currentDate: {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1, // getMonth() returns 0-11
                    year: new Date().getFullYear(),
                },



                company_details: {
                    title: 'Federation of Saudi Chambers',
                    account_no: '25350612000200',
                    iban_no: 'SA90 1000 0025 3506 1200 0200',
                    bank_name: 'Saudi National Bank - SNB',
                    bank_swift_code: 'NCBKSAJE',
                },
                BACKEND_URL: BACKEND_URL,
            };


            const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
            const pdfFilename1 = `Receipt-${existingUser?.company_name_eng}-${currentDocument.transaction_id}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;

            const pdfFilePath = path.join(pdfDirectory, pdfFilename1);

            if (!fsSync.existsSync(pdfDirectory)) {
                fsSync.mkdirSync(pdfDirectory, { recursive: true });
            }

            const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), data1, pdfFilePath);


            // read the file into a buffer

            const pdfBuffer2 = await fs1.readFile(pdfFilePath);



            const newDocument = await prisma.member_documents.createMany({
                data: [
                    {
                        type: 'certificate',
                        document: `/uploads/documents/MemberCertificates/${pdfFilename}`,
                        transaction_id: currentDocument.transaction_id,
                        user_id: currentDocument.user_id,
                        doc_type: 'member_document',
                        status: 'approved',
                        // TODO: take email form current admin token
                        // uploaded_by: req.admin.email, // Assuming the admin is logged in
                        uploaded_by: 'admin@gs1sa.link',
                    },
                    {
                        type: 'receipt',
                        document: `/uploads/documents/MemberRegInvoice/${pdfFilename1}`,
                        transaction_id: currentDocument.transaction_id,
                        user_id: currentDocument.user_id,
                        doc_type: 'member_document',
                        status: 'approved',
                        // TODO: take email form current admin token
                        // uploaded_by: req.admin.email, // Assuming the admin is logged in
                        uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
                    }
                ]
            });





            // Update the document status in the database
            // document: `/uploads/documents/MemberCertificates/${pdfFilename}`,

            await sendStatusUpdateEmail(existingUser.email, value.status, value.status === 'approved' ? { pdfBuffer, pdfFilename } : null, { pdfBuffer2, pdfFilename1 },);
            await prisma.member_documents.update({
                where: { id: documentId },
                data: { status: value.status }
            });


            // Insert Member History log
            // const logData = {
            //     // TODO: check if it uploaded by admin or user. cehck if req.admin exist then use req.admin.email else use req.user.email
            //     subject: `${value.type} Document Uploaded by ${value.uploaded_by}`,
            //     // user user memberId
            //     // member_id: value.memberID,
            //     user_id: value.user_id,
            //     // TODO: add middleware for current admin token 
            // }



            // Insert Member History log
            const logData = {
                subject: 'Member Account Approved by Admin',
                // user user memberId
                // member_id: userUpdateResult.memberID,
                user_id: userUpdateResult.id,
                // TODO: take email form current admin token
                admin_id: 'admin@gs1sa.link',

            }


            TODO: // chec this
            // if (req?.admin.id) {
            //     logData.admin_id = admin_email;
            // logData.created_by_admin = 1;
            // }

            console.log("logData", logData);

            await createMemberLogs(logData);

            // create brand using Company Name and Company Name Arabic

            const newBrand = await prisma.brands.create({
                data: {
                    name: existingUser.company_name_eng,
                    name_ar: existingUser.company_name_arabic,
                    status: 'active',
                    user_id: existingUser.id,
                    companyID: existingUser.companyID,
                }
            });

            if (value.migration === true) {
                // Retrieve MemberID from user's column memberID
                const memberID = existingUser.memberID;

                // Fetch products from oldGs1Prisma table Mem.products based on MemberID
                const oldProducts = await oldGs1Prisma.query(`
                    SELECT * FROM Mem.products WHERE MemberID = ${memberID}
                `);

                // Map and insert data into the new database table Product
                for (const oldProduct of oldProducts) {
                    const newProduct = {
                        MemberID: oldProduct.MemberID,
                        ProductNameE: oldProduct.productnameenglish,
                        ProductNameA: oldProduct.productnamearabic,
                        BrandName: oldProduct.BrandName,
                        ProductTypeID: oldProduct.ProductType,
                        Origin: oldProduct.Origin,
                        // ColorID: null, 
                        // PackagingTypeID: null, 
                        // PackagingLevelID: null, 
                        MnfCode: oldProduct.MnfCode,
                        MnfGLN: oldProduct.MnfGLN,
                        ProvGLN: oldProduct.ProvGLN,
                        ImageURL: oldProduct.front_image,
                        DetailsPage: oldProduct.details_page,
                        // ChildProductID: null, 
                        // ChildQuantity: null, 
                        // UOMID: null, 
                        Size: oldProduct.size ? parseFloat(oldProduct.size) : null,
                        // BarCodeID: null, 
                        BarCode: oldProduct.barcode,
                        // BarCodeURL: null, 
                        IsActive: oldProduct.status === 1,
                        // CreatedBy: null, 
                        CreatedDate: oldProduct.created_at, // Use the old created_at value
                        // UpdatedBy: null, 
                        UpdatedDate: oldProduct.updated_at, // Use the old updated_at value
                    };

                    // Insert the newProduct into the Product table in the new database
                    await prisma.products.create(newProduct);
                }


                // Fetch other products subscriptions based on user_id and isDeleted=false
                const otherProductsSubscriptions = await prisma.other_products_subcriptions.findFirst({
                    where: {
                        user_id: existingUser.id,
                        isDeleted: false,
                    },
                    include: [{
                        model: product,
                        where: {
                            product_name: "GLN (30 Locations)",
                        },
                        required: true, // Ensure the product is found
                    }],
                });
                console.log("otherProductsSubscriptions", otherProductsSubscriptions);
                // Check if the product "GLN (30 Locations)" is found in subscriptions
                if (otherProductsSubscriptions && otherProductsSubscriptions.product.product_name === "GLN (30 Locations)") {
                    // Fetch all records from the old Location table based on some condition (you can modify the condition as needed)
                    const oldLocationData = await oldGs1Prisma.query(`
                        SELECT * FROM Location WHERE MemberID = ${memberID}
                    `);

                    // Iterate through the oldLocationData and insert into add_member_gln_products
                    for (const oldLocation of oldLocationData) {
                        const newLocation = {
                            product_id: otherProductsSubscriptions.product_id, // Assuming this is mapped correctly
                            reference_id: otherProductsSubscriptions.reference_id, // Assuming this is mapped correctly
                            locationNameEn: oldLocation.LocationNameE,
                            locationNameAr: oldLocation.LocationNameA,
                            AddressEn: oldLocation.AddressE,
                            AddressAr: oldLocation.AddressA,
                            pobox: oldLocation.POBox.toString(),
                            postal_code: oldLocation.PostalCode,
                            country_id: null, // You may map this from old data if available
                            state_id: null, // You may map this from old data if available
                            city_id: oldLocation.CityID.toString(),
                            licence_no: oldLocation.LocationCRNo,
                            locationCRNumber: oldLocation.LocationCRNo,
                            office_tel: oldLocation.OfficeTelNo,
                            tel_extension: null, // You may map this from old data if available
                            office_fax: oldLocation.OfficeFaxNo,
                            fax_extension: null, // You may map this from old data if available
                            contact1Name: oldLocation.Contact1,
                            contact1Email: oldLocation.Contact1Email,
                            contact1Mobile: oldLocation.Contact1Mobile,
                            contact2Name: oldLocation.Contact2,
                            contact2Email: oldLocation.Contact2Email,
                            contact2Mobile: oldLocation.Contact2Mobile,
                            longitude: oldLocation.Longitude,
                            latitude: oldLocation.Latitude,
                            image: null, // You may map this from old data if available
                            GLNBarcodeNumber: oldLocation.GLN,
                            GLNBarcodeNumber_without_check: null, // You may map this from old data if available
                            status: oldLocation.IsActive.toString(), // Map the boolean to string
                            user_id: memberID,
                            created_at: otherProductsSubscriptions.created_at, // Use the old created_at value
                            updated_at: otherProductsSubscriptions.updated_at, // Use the old updated_at value
                            gcpGLNID: null, // You may map this from old data if available
                            deleted_at: null, // No deletion date in old data
                            admin_id: "0", // Default value as "0"
                        };

                        // Insert the newLocation into the add_member_gln_products table
                        await prisma.add_member_gln_products.create(newLocation);
                    }
                }
            }






        }

        // if (value.status === 'rejected') {
        //     // Set the document status to pending
        //     await prisma.member_documents.update({
        //         where: { id: documentId },
        //         data: { status: 'pending' }
        //     });




        //     // Send email with optional reject reason
        //     await sendStatusUpdateEmail(existingUser.email, value.status, null, null, value.reject_reason);
        // }
        if (value.status === 'rejected') {
            // Set the document status to pending
            await prisma.member_documents.update({
                where: { id: documentId },
                data: { status: 'pending' }
            });




            // Send email with optional reject reason
            await sendStatusUpdateEmail(existingUser.email, value.status, null, null, value.reject_reason);
        }




        // Delete all documents of type 'bank_slip'
        for (const document of bankSlipDocuments) {
            const deletingDocumentPath = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'memberDocuments', document.document.replace(/\\/g, '/'));
            console.log("deletingDocumentPath");
            console.log(deletingDocumentPath);
            try {
                if (fsSync.existsSync(deletingDocumentPath)) {
                    fsSync.unlinkSync(deletingDocumentPath);
                }
            } catch (err) {
                console.error(`Error deleting file: ${deletingDocumentPath}`, err);
            }
        }

        const deletedResult = await prisma.member_documents.deleteMany({
            where: {
                user_id: currentDocument.user_id,
                transaction_id: currentDocument.transaction_id,
                type: 'bank_slip',
            }
        });

        await updateUserPendingInvoiceStatus(currentDocument.user_id)

        // return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
        if (value.status === 'approved') {
            return res.json({ message: 'Document status updated to approved' });
        }
        else {
            return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
};

const regenerateGcpCertificateSchema = Joi.object({
    userId: Joi.string().required(),

});


export const regenerateGcpCertificate = async (req, res, next) => {
    try {
        // Validate the request body
        const { error, value } = regenerateGcpCertificateSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        // Check if the user exists
        const existingUser = await prisma.users.findUnique({ where: { id: value.userId } });
        if (!existingUser) {
            throw createError(404, 'User not found');
        }

        // Check if the user has a valid GCP
        if (!existingUser.gcpGLNID || !existingUser.gln) {
            throw createError(400, 'User does not have a valid GCP');
        }



        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        let gcpGLNID = existingUser?.gcpGLNID;
        const CertificateData = {
            BACKEND_URL: BACKEND_URL,
            qrCodeDataURL: qrCodeDataURL,

            user: {
                company_name_eng: existingUser?.company_name_eng,
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
                gln: existingUser?.gln,
                memberID: existingUser?.memberID,
                gcp_expiry: existingUser?.gcp_expiry,
            },
            // userUpdateResult.gcp_expiry, update this to add only date adn remove time
            expiryDate: existingUser?.gcp_expiry.toISOString().split('T')[0],
            explodeGPCCode: []
        };

        console.log("existingUser")
        console.log(existingUser)





        // Generate PDF from EJS template
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
        let pdfFilename = `${existingUser.company_name_eng}-Certificate.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);
        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }



        // find the member document with type certificate
        const currentDocument = await prisma.member_documents.findFirst({
            where: {
                user_id: existingUser.id,
                type: 'certificate',
            }
        });


        const deletingDocumentPath = path.join(__dirname, '..', 'public', currentDocument.document.replace(/\\/g, '/'));
        console.log("deletingDocumentPath");
        console.log(deletingDocumentPath);
        try {
            if (fsSync.existsSync(deletingDocumentPath)) {
                fsSync.unlinkSync(deletingDocumentPath);
                console.log(`File deleted: ${deletingDocumentPath}`);
            } else {
                console.log(`File not found: ${deletingDocumentPath}`);
            }
        } catch (err) {
            console.error(`Error deleting file: ${deletingDocumentPath}`, err);
        }
        const Certificatepath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'certificate.ejs'), CertificateData, pdfFilePath, true);
        let pdfBuffer = await fs1.readFile(Certificatepath);
        const updatedDocument = await prisma.member_documents.update({
            where: { id: currentDocument.id },
            data: {
                document: `/uploads/documents/MemberCertificates/${pdfFilename}`,
            }

        });

        // Send an email based on the updated status use send email function
        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: existingUser.email,
            subject: 'New GCP Certificate',
            htmlContent: '<p>Your GCP Certificate has been updated.</p>',
            attachments: [{
                filename: pdfFilename,
                content: pdfBuffer,
                contentType: 'application/pdf'
            }]
        });

        return res.json({ message: 'GCP Certificate regenerated successfully' });
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
        if (pdfBuffer && typeof pdfBuffer === 'object') {
            attachments.push({
                filename: pdfBuffer.pdfFilename || 'certificate.pdf',
                content: pdfBuffer.pdfBuffer,
                contentType: 'application/pdf'
            });
        }
        if (pdfBuffer2 && typeof pdfBuffer2 === 'object') {
            attachments.push({
                filename: pdfBuffer2.pdfFilename1 || 'Recipient.pdf',
                content: pdfBuffer2.pdfBuffer2,
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
