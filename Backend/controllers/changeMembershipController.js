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
import { createMemberLogs } from '../utils/functions/historyLogs.js';
import { convertEjsToPdf } from '../utils/functions/commonFunction.js';
import { generateRandomTransactionId } from '../utils/utils.js';



// in scheema take user_id 
const renewMembershipSchema = Joi.object({
    user_id: Joi.string().required(),
});


export const membershipRenewRequest = async (req, res, next) => {

    // Validate the request body
    const { error, value } = renewMembershipSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const currentDate = new Date();
    const renewalYear = currentDate.getFullYear() + 1;


    try {

        let existingUser = await prisma.users.findUnique({
            where: { id: value.user_id },
            include: {
                carts: true,
            },
        });
        if (!existingUser) {
            next(createError(404, 'User not found'));
        }

        console.log(existingUser);


        let cart = existingUser.carts[0];
        let cartData = JSON.parse(cart.cart_items);
        cart.cart_items = cartData


        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const invoiceData = {
            topHeading: "RENWAL INVOICE",
            secondHeading: "RENWAL INVOICE FOR",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,

                registeration: `Renewal for the year ${renewalYear}`,
                // Assuming $addMember->id is already known
                company_name_eng: existingUser.company_name_eng,
                mobile: existingUser.mobile,
                address: {
                    zip: existingUser.zip_code,
                    countryName: existingUser.country,
                    stateName: existingUser.state,
                    cityName: existingUser.city,
                },
                companyID: existingUser.companyID,
                membership_otherCategory: existingUser.membership_category,
                gtin_subscription: {
                    products: {
                        member_category_description: cartData?.[0].productName,
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
        const pdfFilename1 = `Receipt-${existingUser?.company_name_eng}-${existingUser.transaction_id}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;

        const pdfFilePath = path.join(pdfDirectory, pdfFilename1);

        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceData, pdfFilePath);


        // read the file into a buffer

        const pdfBuffer2 = await fs1.readFile(pdfFilePath);


        const newDocument = await prisma.member_documents.create({
            data: {
                type: 'renewal_invoice',
                document: `/uploads/documents/MemberRegInvoice/${pdfFilename1}`,
                transaction_id: existingUser.transaction_id,
                user_id: existingUser.id,
                doc_type: 'member_document',
                status: 'pending',
                // TODO: take email form current admin token
                // uploaded_by: req.admin.email, // Assuming the admin is logged in
                uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
            }

        });


        let subject = 'GS1 Saudi Arabia Membership Renewal Request';
        let emailContent = `This is automated renewal invoice of your Renewal Subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
        let userEmail = existingUser.email;

        let attachments = [
            {
                filename: pdfFilename1,
                content: pdfBuffer2,
                contentType: 'application/pdf',
            },
        ];

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: userEmail,
            subject: subject,

            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
            // if status is approved, attach the certificate PDF
            attachments: attachments

        });


        // Insert Member History log
        const logData = {
            subject: 'Renewal invoice created',
            // user user memberId
            // member_id: userUpdateResult.memberID,
            user_id: existingUser.id,
            // TODO: take email form current admin token
            admin_id: 'admin@gs1sa.link',

        }


        TODO: // chec this
        // if (req?.admin.id) {
        //     logData.admin_id = admin_email;
        // logData.created_by_admin = 1;
        // }

        await createMemberLogs(logData);

        return res.status(200).json({ message: `Renewal invoice created & sent to ${userEmail} successfully` });


    }
    catch (error) {
        console.error(error);
        next(createError(500, 'Server error occurred'));

    }

};







const updateMemberDocumentStatusSchema = Joi.object({
    status: Joi.string().valid('approved', 'rejected').required(),
    reject_reason: Joi.string().optional(),
});



export const updateMemberRenewalDocumentStatus = async (req, res, next) => {
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
            return next(createError(400, `No bank slip documents found for this ${currentDocument?.type} with transaction ID: ${currentDocument.transaction_id}`));
        }


        if (value.status === 'approved') {
            await prisma.$transaction(async (prisma) => {
                // Fetch the user ID from the member_documents table
                const userId = currentDocument.user_id;


                // Perform the updateUserStatus logic
                cart = await prisma.carts.findFirst({ where: { user_id: userId } });
                console.log("cartss", cart);
                if (cart && cart.cart_items) {
                    const cartItems = JSON.parse(cart.cart_items);
                    const firstCartItem = cartItems[0];
                    const product = await prisma.gtin_products.findUnique({
                        where: { id: firstCartItem.productID }
                    });

                    if (product) {


                        // Calculate expiry date (1 year from now)
                        let expiryDate = new Date();
                        expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());
                        console.log("expiryDate");
                        console.log(expiryDate);
                        // Update user with new information
                        userUpdateResult = await prisma.users.update({
                            where: { id: userId },
                            data: {
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
                                // gtin_subscription_limit: product.total_no_of_barcodes,
                                // gtin_subscription_total_price: product.gtin_yearly_subscription_fee,

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
                                    transaction_id: currentDocument.transaction_id // if you want to update only those records that match the transaction_id
                                },
                                data: {
                                    // other_products_subscription_limit: product.total_no_of_barcodes,
                                    // other_products_subscription_total_price: subscriptionFee,
                                    status: 'active',  // Update the status
                                    expiry_date: expiryDate // Update the expiry date
                                }
                            });
                        }


                        // update isRegistered in crs to 1 by  cr_number and cr_activity
                        // await prisma.crs.updateMany({
                        //     where: {
                        //         cr: existingUser.cr_number,
                        //         activity: existingUser.cr_activity
                        //     },
                        //     data: {
                        //         isRegistered: 1
                        //     }
                        // });

                        // await prisma.gtin_products.update({
                        //     where: { id: product.id },
                        //     data: { gcp_start_range: (parseInt(product.gcp_start_range) + 1).toString() }
                        // });

                        // Fetch and update TblSysCtrNo
                        // const tblSysNo = await prisma.tblSysNo.findFirst();
                        // if (tblSysNo) {
                        //     userUpdateResult = await prisma.users.update({
                        //         where: { id: userId },
                        //         data: {
                        //             companyID: tblSysNo.TblSysCtrNo,
                        //             memberID: tblSysNo.TblSysCtrNo,
                        //         }
                        //     });

                        //     await prisma.tblSysNo.update({
                        //         where: { SysNoID: tblSysNo.SysNoID },
                        //         data: { TblSysCtrNo: (parseInt(tblSysNo.TblSysCtrNo) + 1).toString() }
                        //     });
                        // }
                    }
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



                // Generate PDF from EJS template
                const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
                // use current date time to generate unique file name
                pdfFilename = `${existingUser.company_name_eng}-Renewed_Certificate-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
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
            const currentDate = new Date();
            const renewalYear = currentDate.getFullYear() + 1;

            let cartData = JSON.parse(cart.cart_items);
            cart.cart_items = cartData
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const data1 = {
                topHeading: "RECEIPT",
                secondHeading: "RECEIPT FOR",
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,
                    registeration: `Renewal for the year ${renewalYear}`,
                    // Assuming $addMember->id is already known
                    company_name_eng: existingUser.company_name_eng,
                    mobile: existingUser.mobile,
                    address: {
                        zip: existingUser.zip_code,
                        countryName: existingUser.country,
                        stateName: existingUser.state,
                        cityName: existingUser.city,
                    },
                    companyID: existingUser.companyID,
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
                subject: 'Membership renewal approved by admin',
                // user user memberId
                // member_id: userUpdateResult.memberID,
                user_id: existingUser.id,
                // TODO: take email form current admin token
                admin_id: 'admin@gs1sa.link',

            }


            TODO: // chec this
            // if (req?.admin.id) {
            //     logData.admin_id = admin_email;
            // logData.created_by_admin = 1;
            // }



            await createMemberLogs(logData);



        }

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



        // bankslip path in doucment table is like this \uploads\documents\memberDocuments\document-1703229100646.pdf
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

        // return res.json({ message: 'Document status updated to pending and bank slip documents deleted' });
        if (value.status === 'approved') {
            return res.json({ message: `Document status updated to ${value.status} and bank slip documents deleted` });
        }
        else {
            return res.json({ message: `Document status updated to ${value.status}` });
        }

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
            subject = 'Your Gs1Ksa member Account has been Renewed';
            emailContent = '<p>Your account is renewed successfully. Please find the attached certificate for your reference.<br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia</p>';
            break;
        case 'rejected':
            subject = 'Your Gs1Ksa renewal request is Rejected';
            let rejectionMessage = rejectReason ? `<p>Reason for rejection: ${rejectReason}</p>` : '';
            emailContent = `<p>Your account status has been updated to: ${status}.</p>${rejectionMessage}`;
            break;
        // Add more cases for other statuses
        default:
            subject = 'Your Gs1Ksa renewal request is Rejected';
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

const upgradeMembershipSchema = Joi.object({
    user_id: Joi.string().required(),
    // additional_barcodes: Joi.number().required(),
    // price: Joi.number().required(),
    gtin_product_id: Joi.string().required(),
});




export const updradeMemberSubscpiptionRequest = async (req, res, next) => {
    // Validate the request body
    const { error, value } = upgradeMembershipSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }



    try {

        const user = await prisma.users.findUnique({
            where: { id: value.user_id },
            include: {
                carts: true,
            },

        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        // fetch  data from gtin_upgrade_pricing table 
        const gtinUpgradePricing = await prisma.gtin_upgrade_pricing.findUnique({
            where: { id: value.gtin_product_id },
        });

        if (!gtinUpgradePricing) {
            throw createError(404, 'GTIN upgrade pricing not found');
        }
        console.log("gtinUpgradePricing", gtinUpgradePricing);

        const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
            where: { user_id: value.user_id },
            include: {
                gtin_product: true // Include the associated gtin_product
            }
        });

        if (!gtinSubscriptions) {
            throw createError(404, 'GTIN subscription not found');
        }

        console.log("gtinSubscriptions", gtinSubscriptions);
        // Calculate the total number of barcodes after adding the new ones
        const currentLimit = gtinSubscriptions.gtin_subscription_limit;
        const currentCounter = gtinSubscriptions.gtin_subscription_counter;
        const totalBarcodes = currentLimit + currentCounter + gtinUpgradePricing.total_no_of_barcodes;

        console.log("totalBarcodes", totalBarcodes);

        // Checking the barcode limit based on user's current category
        const categoryLimits = { 100: 999, 1000: 9999, 10000: 49999, 50000: 99999 };
        if (totalBarcodes > categoryLimits[gtinSubscriptions?.gtin_product?.total_no_of_barcodes]) {
            throw createError(400, `You can't add more than ${categoryLimits[gtinSubscriptions?.gtin_product?.total_no_of_barcodes]} barcodes`);
        }

        const randomTransactionIdLength = 10; // adjust the length as needed 2*5 = 10 for 10 digit transaction id
        const transactionId = generateRandomTransactionId(randomTransactionIdLength);


        let cart = user.carts[0];
        let cartData = JSON.parse(cart.cart_items);
        cart.cart_items = []

        cart.cart_items.push({
            productName: `${gtinUpgradePricing.total_no_of_barcodes} Barcodes`,
            registration_fee: 0,
            yearly_fee: gtinUpgradePricing.price,
        });
        cart.total = gtinUpgradePricing.price;
        cart.transaction_id = transactionId;

        // Generate an invoice
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const invoiceData = {
            topHeading: "UPGRADE INVOICE",
            secondHeading: "UPGRADE INVOICE FOR",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,

                registeration: `Upgrade invoice for ${gtinUpgradePricing.total_no_of_barcodes} barcodes`,
                // Assuming $addMember->id is already known
                company_name_eng: user.company_name_eng,
                mobile: user.mobile,
                address: {
                    zip: user.zip_code,
                    countryName: user.country,
                    stateName: user.state,
                    cityName: user.city,
                },
                companyID: user.companyID,
                membership_otherCategory: user.membership_category,
                gtin_subscription: {
                    products: {
                        member_category_description: cartData?.[0].productName,
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
        const pdfFilename = `Receipt-${user.company_name_eng}-${transactionId}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdir(pdfDirectory, { recursive: true });
        }

        const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceData, pdfFilePath);

        // Read the file into a buffer
        const pdfBuffer = await fs1.readFile(pdfFilePath);

        // insert into upgrade_member_ship_cart
        await prisma.upgrade_member_ship_cart.create({
            data: {
                user_id: user.id,
                gtin_product_id: value.gtin_product_id,
                transaction_id: transactionId,
                registered_product_transaction_id: user.transaction_id,
                status: 0,
            }
        });


        await prisma.member_documents.create({
            data: {
                type: 'upgrade_invoice',
                document: `/uploads/documents/MemberRegInvoice/${pdfFilename}`,
                transaction_id: transactionId,
                user_id: user.id,
                doc_type: 'member_document',
                status: 'pending',
                // TODO: take email form current admin token
                // uploaded_by: req.admin.email, // Assuming the admin is logged in
                uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
            }

        });

        // Send email with invoice
        const subject = 'GS1 Saudi Arabia Membership Upgrade Request';
        const emailContent = `This is an automated renewal invoice of your Renewal Subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
        const attachments = [
            {
                filename: pdfFilename,
                content: pdfBuffer,
                contentType: 'application/pdf',
            },
        ];

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: user.email,
            subject: subject,

            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
            attachments: attachments
        });

        // Insert Member History log
        const logData = {
            subject: 'Upgrade invoice created',
            // user user memberId
            // member_id: userUpdateResult.memberID,
            user_id: user?.id,
            // TODO: take email form current admin token
            admin_id: 'admin@gs1sa.link',

        }


        TODO: // chec this
        // if (req?.admin.id) {
        //     logData.admin_id = admin_email;
        // logData.created_by_admin = 1;
        // }

        await createMemberLogs(logData);


        res.status(200).json({ message: `Renewal invoice created & sent to ${user.email} successfully` });
    } catch (error) {
        console.error(error);
        next(error)
    }
}


export const approveMembershipRequest = async (req, res, next) => {


    const schema = Joi.object({
        transactionId: Joi.string().required(),
        userId: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { transactionId, userId } = value;

    try {
        // Fetch upgrade cart
        const upgradeCart = await prisma.upgrade_member_ship_cart.findFirst({
            where: {
                transaction_id: transactionId,
                user_id: userId,
            },
            include: {
                gtin_upgrade_pricing: true,
            },
        });

        if (!upgradeCart) {
            return res.status(404).send('Upgrade membership cart not found');
        }

        // Fetch user data
        const user = await prisma.users.findUnique({
            where: { id: userId },
            include: {
                carts: true,
            },
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const totalBarcodesToAdd = upgradeCart.gtin_upgrade_pricing.total_no_of_barcodes;
        let gtinUpgradePricing = upgradeCart.gtin_upgrade_pricing;
        // Update gtin_subscription_limit in gtin_subscriptions
        const updateResponse = await prisma.gtin_subcriptions.updateMany({
            where: {
                user_id: userId,

            },
            data: {
                gtin_subscription_limit: {
                    increment: totalBarcodesToAdd,
                },
            },
        });

        if (updateResponse.count === 0) {
            return res.status(404).send('GTIN subscription not found for the user');
        }
        let emailContent = `Thank you for upgrading your membership. Please find the attached receipt for your reference.`;
        let gcpGLNIDUpdated = false;
        let oldGcpGLNID = user.gcpGLNID;

        // Check for special cases and update gcpGLNID and GLN if necessary
        if ([10000, 50000, 100000].includes(totalBarcodesToAdd)) {
            const product = await prisma.gtin_products.findFirst({
                where: { total_no_of_barcodes: totalBarcodesToAdd },
            });

            if (product) {
                const gcpGLNID = `628${product.gcp_start_range}`;
                const gln = generateGTIN13(gcpGLNID); // Replace with your actual GTIN generation logic
                let expiryDate = new Date();
                expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());
                // Update user with new gcpGLNID and GLN
                await prisma.users.update({
                    where: { id: userId },
                    data: {
                        gcpGLNID: gcpGLNID,
                        gln: gln,
                        gcp_expiry: expiryDate,

                        // other fields as necessary
                    },
                });
                await prisma.gtin_subcriptions.updateMany({
                    // update based on the transaction ID
                    where: { transaction_id: upgradeCart.registered_product_transaction_id },
                    data: {

                        expiry_date: expiryDate,


                    }
                });


                await prisma.other_products_subcriptions.updateMany({
                    where: {
                        transaction_id: upgradeCart.registered_product_transaction_id // if you want to update only those records that match the transaction_id
                    },
                    data: {
                        expiry_date: expiryDate // Update the expiry date
                    }
                });

                // Update product's gcp_start_range
                await prisma.gtin_products.update({
                    where: { id: product.id },
                    data: {
                        gcp_start_range: String(parseInt(product.gcp_start_range) + 1),
                    },
                });

                gcpGLNIDUpdated = true;
            }
        }



        let cart = user.carts[0];

        cart.cart_items = []

        cart.cart_items.push({
            productName: `${gtinUpgradePricing.total_no_of_barcodes} Barcodes`,
            registration_fee: 0,
            yearly_fee: gtinUpgradePricing.price,
        });
        cart.total = gtinUpgradePricing.price;
        cart.transaction_id = transactionId;

        // Generate receipt
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const receiptData = {
            topHeading: "MEMBERSHIP UPGRADE RECEIPT",
            secondHeading: "RECEIPT FOR MEMBERSHIP UPGRADE",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                upgradeDetails: `Receipt for upgrade of ${totalBarcodesToAdd} barcodes`,
                company_name_eng: user.company_name_eng,
                mobile: user.mobile,
                address: {
                    zip: user.zip_code,
                    countryName: user.country,
                    stateName: user.state,
                    cityName: user.city,
                },
                companyID: user.companyID,
                membership_otherCategory: user.membership_category,
                gtin_subscription: {
                    products: {
                        member_category_description: upgradeCart.productName,
                    },
                },
            },

            cart: cart,
            currentDate: {
                day: new Date().getDate(),
                month: new Date().getMonth() + 1,
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
        const pdfFilename = `Receipt-${user.company_name_eng}-${transactionId}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), receiptData, pdfFilePath);
        const pdfBuffer = await fs1.readFile(pdfFilePath);

        // Update email content if gcpGLNID is updated
        if (gcpGLNIDUpdated) {
            emailContent = `Thank you for upgrading your membership. Your GPC/GLN has been updated from ${oldGcpGLNID} to ${user.gcpGLNID}. Please find the attached receipt for your reference.`;
        }

        // Send email with receipt
        await sendEmail({
            fromEmail: ADMIN_EMAIL, // Replace with your admin email
            toEmail: user.email,
            subject: 'Membership Upgrade Receipt - GS1 Saudi Arabia',
            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
            attachments: [
                {
                    filename: pdfFilename,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        });

        // Delete the upgrade_membership_cart record
        await prisma.upgrade_member_ship_cart.delete({
            where: { id: upgradeCart.id },
        });


        // Insert Member History log
        const logData = {
            subject: `Membership upgraded by adding ${totalBarcodesToAdd} barcodes. ${gcpGLNIDUpdated ? `GPC/GLN updated from ${oldGcpGLNID} to ${user.gcpGLNID}.` : ''}`,
            // member_id: userUpdateResult.memberID,
            user_id: userId,
            // TODO: take email form current admin token
            admin_id: 'admin@gs1sa.link',

        }


        TODO: // chec this
        // if (req?.admin.id) {
        //     logData.admin_id = admin_email;
        // logData.created_by_admin = 1;
        // }

        await createMemberLogs(logData);

        res.status(200).json({ message: 'Membership request approved successfully and receipt sent to user email.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};


