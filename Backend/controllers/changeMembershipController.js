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
import { createAdminLogs, createGtinSubscriptionHistory, createMemberLogs, createOtherProductsSubscriptionHistory } from '../utils/functions/historyLogs.js';
import { convertEjsToPdf } from '../utils/functions/commonFunction.js';
import { generateRandomTransactionId } from '../utils/utils.js';
import { updateUserPendingInvoiceStatus } from '../utils/functions/apisFunctions.js';

// in scheema take user_id 
const renewMembershipSchema = Joi.object({
    user_id: Joi.string().required(),
});

async function calculateSubscriptionPrice(userId, newSubscriptionId) {
    try {
        // Fetch details of the old subscription based on the user ID
        const oldSubscription = await prisma.gtin_subcriptions.findFirst({
            where: {
                user_id: userId,
                isDeleted: false,
            },
            include: {
                gtin_product: true, // Fetch gtin_product details
            },
        });
        console.log("oldSubscription", oldSubscription);

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user)
            throw new Error('User not found');

        // Fetch details of the new subscription
        const newSubscription = await prisma.gtin_products.findUnique({
            where: { id: newSubscriptionId },
        });

        if (!oldSubscription)
            throw new Error('Old subscription not found');

        if (!newSubscription)
            throw new Error('New subscription not found');

        // Calculate the remaining months of the old subscription
        const currentDate = new Date();
        const expiryDate = new Date(oldSubscription.expiry_date);
        const remainingMonths = Math.max(0, expiryDate.getMonth() - currentDate.getMonth() +
            12 * (expiryDate.getFullYear() - currentDate.getFullYear()));
        console.log("remainingMonths", remainingMonths);

        // Initial fee calculations
        let newRegistrationFee;
        let remainingMonthsFee = 0;

        // Determine new subscription registration fee based on user's membership category
        let newSubscriptionRegistrationFee = user.membership_category === "non_med_category" ?
            newSubscription.member_registration_fee : newSubscription.med_registration_fee;
        let oldSubscriptionRegistrationFee = user.membership_category === "non_med_category" ?
            oldSubscription.gtin_product.member_registration_fee :
            oldSubscription.gtin_product.med_registration_fee;
        // Adjust registration fee based on old subscription
        if (remainingMonths <= 0) {
            newRegistrationFee = newSubscriptionRegistrationFee;
        } else {



            newRegistrationFee =
                newSubscriptionRegistrationFee -
                oldSubscriptionRegistrationFee;

            // Calculate remaining months fee from old subscription
            remainingMonthsFee =
                (remainingMonths / 12) * oldSubscription.gtin_subscription_total_price;
        }
        console.log("newRegistrationFeeeeee", newRegistrationFee);
        // Determine new subscription yearly fee based on user's membership category
        const newSubscriptionYearlyFee =
            user.membership_category === "non_med_category"
                ? newSubscription.gtin_yearly_subscription_fee
                : newSubscription.med_yearly_subscription_fee;


        // Calculate remaining yearly fee for new subscription
        const remainingYearlyFee = (remainingMonths / 12) * newSubscriptionYearlyFee;

        // Calculate the final price
        const finalPrice =
            newRegistrationFee - remainingMonthsFee + newSubscriptionYearlyFee

        // Prepare and return the detailed response
        return {
            finalPrice: finalPrice,
            newRegistrationFee: newRegistrationFee,
            remainingMonthsFee: remainingMonthsFee,
            newSubscriptionYearlyFee: newSubscriptionYearlyFee,
            remainingYearlyFee: remainingYearlyFee,
            remainingMonths: remainingMonths
        };
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await prisma.$disconnect(); // Disconnect from the database
    }
}





export const getUpgradeMembershipCarts = async (req, res, next) => {
    try {
        // Define validation rules for query parameters
        const filterSchema = Joi.object({
            user_id: Joi.string(),
            gtin_product_id: Joi.string(),
            transaction_id: Joi.string(),
            registered_product_transaction_id: Joi.string(),
            status: Joi.number(),
            // Add other fields if necessary
        }).unknown(false);

        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Construct the filter conditions
        const filterConditions = Object.keys(value).reduce((obj, key) => {
            obj[key] = value[key];
            return obj;
        }, {});

        // Fetch upgrade membership carts
        const carts = await prisma.upgrade_member_ship_cart.findMany({
            where: filterConditions,
            // Include relationships if necessary
        });

        return res.json(carts);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const getAddGlnCarts = async (req, res, next) => {
    try {
        // Define validation rules for query parameters
        const filterSchema = Joi.object({
            user_id: Joi.string(),
            new_gln_id: Joi.string(),
            other_products_subscription_id: Joi.string(),
            transaction_id: Joi.string(),
            registered_product_transaction_id: Joi.string(),
            status: Joi.number(),
            // Add other fields if necessary
        }).unknown(false);

        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }

        // Construct the filter conditions
        const filterConditions = Object.keys(value).reduce((obj, key) => {
            obj[key] = value[key];
            return obj;
        }, {});

        // Fetch add GLN carts
        const carts = await prisma.add_gln_cart.findMany({
            where: filterConditions,
            // Include relationships if necessary
        });

        return res.json(carts);
    } catch (error) {
        console.error(error);
        next(error);
    }

};





export const getInvoiceDetailsForUpgradeSubscription = async (req, res) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        newSubscriptionId: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { userId, newSubscriptionId } = value;

    try {
        const subscriptionDetails = await calculateSubscriptionPrice(userId, newSubscriptionId);
        console.log(`Details for the new subscription:`, subscriptionDetails);
        res.json(subscriptionDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
};



export const membershipRenewRequest = async (req, res, next) => {

    // Validate the request body
    const { error, value } = renewMembershipSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    const currentDate = new Date();
    let renewalYear;
    const randomTransactionIdLength = 10;
    const transactionId = generateRandomTransactionId(randomTransactionIdLength);

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
        cartData[0].registration_fee = 0;
        cart.cart_items = cartData // set gtin product registration fee to 0
        cart.transaction_id = transactionId;


        var expiryDate = new Date(existingUser.gcp_expiry);

        // Add one year
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        // Check if the original date was February 29th on a leap year
        if (existingUser.gcp_expiry.getMonth() === 1 && existingUser.gcp_expiry.getDate() === 29) {
            // Check if the new year is not a leap year
            if ((expiryDate.getFullYear() % 4 !== 0) ||
                (expiryDate.getFullYear() % 100 === 0 && expiryDate.getFullYear() % 400 !== 0)) {
                // Adjust the date to February 28th
                expiryDate.setDate(28);
            }
        }

        console.log("expiryDate");
        console.log(expiryDate);

        renewalYear = expiryDate.getFullYear(); //


        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const invoiceData = {
            topHeading: "INVOICE",
            secondHeading: "RENEWAL INVOICE FOR",
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
                transaction_id: transactionId,
                user_id: existingUser.id,
                doc_type: 'member_document',
                status: 'pending',
                // TODO: take email form current admin token
                // uploaded_by: req.admin.email, // Assuming the admin is logged in
                uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
            }

        });


        let subject = 'GS1 Saudi Arabia Membership Renewal Request';
        let emailContent = `This is automated invoice of your Renewal Subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
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

        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Renewal invoice requested by ${req?.admin?.email} for ${existingUser?.email}`,
                admin_id: req.admin.adminId,
                user_id: existingUser.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `Renewal invoice requested by member ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }

        const activatedGtinProducts = await prisma.gtin_subcriptions.findMany({
            where: { user_id: existingUser.id, isDeleted: false },
        });


        let gtinSubscriptionHistoryData = [{
            transaction_id: transactionId,
            pkg_id: activatedGtinProducts.pkg_id,
            user_id: activatedGtinProducts.user_id,
            price: activatedGtinProducts.gtin_subscription_total_price, // add yearly subscription fee
            request_type: 'renewal',
            expiry_date: activatedGtinProducts.expiry_date,
            admin_id: req.admin.adminId,

        }
        ]

        console.log("gtinSubscriptionHistoryData", gtinSubscriptionHistoryData);

        let activatedOtherProduct = await prisma.other_products_subcriptions.findMany({
            where: {
                user_id: existingUser.id,
                isDeleted: false
            },

        });

        let otherProductsSubscriptionHistoryData = activatedOtherProduct.map(item => ({
            ...(item.react_no && { react_no: item.react_no }),
            transaction_id: transactionId,
            product_id: item.product_id,
            user_id: item.user_id,
            price: item.other_products_subscription_total_price + item.price, // add yearly subscription fee and price (registration fee)
            request_type: 'renewal',
            expiry_date: item.expiry_date,
            admin_id: req?.admin?.adminId,
        }));


        await createGtinSubscriptionHistory(gtinSubscriptionHistoryData);

        await createOtherProductsSubscriptionHistory(otherProductsSubscriptionHistoryData);


        await updateUserPendingInvoiceStatus(existingUser.id);


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
        let expiryDate;

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


                        // Update user with new information
                        // get existingUser.gcp_expiry and add 1 year to it
                        expiryDate = new Date(existingUser.gcp_expiry);

                        // Add one year
                        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

                        // Check if the original date was February 29th on a leap year
                        if (existingUser.gcp_expiry.getMonth() === 1 && existingUser.gcp_expiry.getDate() === 29) {
                            // Check if the new year is not a leap year
                            if ((expiryDate.getFullYear() % 4 !== 0) ||
                                (expiryDate.getFullYear() % 100 === 0 && expiryDate.getFullYear() % 400 !== 0)) {
                                // Adjust the date to February 28th
                                expiryDate.setDate(28);
                            }
                        }

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
                            where: { user_id: userId, isDeleted: false },
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
                                    user_id: userId,
                                    isDeleted: false
                                },
                                data: {
                                    // other_products_subscription_limit: product.total_no_of_barcodes,
                                    // other_products_subscription_total_price: subscriptionFee,
                                    status: 'active',  // Update the status
                                    expiry_date: expiryDate // Update the expiry date
                                }
                            });


                        }




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
                        // gcp_expiry:
                        // use updated expiry date used above
                        expiryDate: expiryDate,
                    },
                    // userUpdateResult.gcp_expiry, update this to add only date adn remove time
                    expiryDate: expiryDate?.toISOString()?.split('T')[0],
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

            // based on transaction id update gtin_subscription_histories table and other_products_subscription_histories table


            await prisma.gtin_subscription_histories.updateMany({
                where: {
                    transaction_id: currentDocument.transaction_id,
                    user_id: currentDocument.user_id,
                    request_type: 'renewal',

                },
                data: {
                    status: 'approved',
                    expiry_date: expiryDate,
                }
            });

            await prisma.other_products_subscription_histories.updateMany({
                where: {
                    transaction_id: currentDocument.transaction_id,
                    user_id: currentDocument.user_id,
                    request_type: 'renewal',
                },
                data: {
                    status: 'approved',
                    expiry_date: expiryDate,
                }

            });




            const renewalYear = expiryDate.getFullYear(); //

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

            // delete bank slip documents deleteMany

            await prisma.member_documents.deleteMany({
                where: {
                    user_id: currentDocument.user_id,
                    transaction_id: currentDocument.transaction_id,
                    type: 'bank_slip',
                }

            });



            if (req?.admin?.adminId) {

                const adminLog = {
                    subject: `Renewal invoice approved by ${req?.admin?.email} for ${existingUser?.companyID}`,
                    admin_id: req.admin.adminId,
                    user_id: existingUser.id,

                }
                await createAdminLogs(adminLog);
            }


            await updateUserPendingInvoiceStatus(existingUser.id);




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
    subType: Joi.string().valid('UPGRADE', 'DOWNGRADE').required(),
    new_subscription_product_Id: Joi.string().required(),
});





export const upgradeMemberSubscriptionRequest = async (req, res, next) => {
    // Validate the request body
    const { error, value } = upgradeMembershipSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        let fetchPrice;
        if (value.subType === "UPGRADE") {
            fetchPrice = await calculateSubscriptionPrice(value.user_id, value.new_subscription_product_Id);
            console.log("fetchPrice", fetchPrice);
            if (fetchPrice.finalPrice < 0) {
                return next(createError(400, 'Invalid subscription upgrade request'));
            }
        }
        const transactionId = generateRandomTransactionId(10);

        const user = await prisma.users.findUnique({
            where: { id: value.user_id },
            include: { carts: true },
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        const subscribedProductDetails = await prisma.gtin_products.findUnique({
            where: { id: value.new_subscription_product_Id },
        });

        if (!subscribedProductDetails) {
            throw createError(404, 'New GTIN subscription not found');
        }




        let registeration_fee;
        let yearly_fee;
        if (value.subType === "UPGRADE") {
            registeration_fee = fetchPrice.newRegistrationFee;
            yearly_fee = fetchPrice.finalPrice - fetchPrice.newRegistrationFee;
        }
        else {
            registeration_fee = user.membership_category === "non_med_category" ?
                subscribedProductDetails.member_registration_fee :
                subscribedProductDetails.med_registration_fee;

            yearly_fee = user.membership_category === "non_med_category" ?
                subscribedProductDetails.gtin_yearly_subscription_fee :
                subscribedProductDetails.med_yearly_subscription_fee;
        }



        const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
            where: {
                user_id: value.user_id, isDeleted: false

            },
            include: { gtin_product: true }
        });

        if (!gtinSubscriptions) {
            throw createError(404, 'Old GTIN subscription not found');
        }

        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {

            const totalBarcodes = gtinSubscriptions.gtin_subscription_limit +
                gtinSubscriptions.gtin_subscription_counter +
                subscribedProductDetails.total_no_of_barcodes;
            let cart = { cart_items: [] };
            // if subType is UPGRADE then in registration fee add final price and in yearly fee add final - registration fee

            cart.cart_items.push({
                registration_fee: registeration_fee,
                yearly_fee: yearly_fee,
                productName: subscribedProductDetails.member_category_description,
            });

            cart.transaction_id = transactionId;
            let typeOfPayment = `${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription invoice for ${subscribedProductDetails.member_category_description}`;
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const invoiceData = {
                topHeading: `INVOICE`,
                secondHeading: `${value.subType === "UPGRADE" ? "UPGRADE" : "DOWNGRADE"} SUBSCRIPTION INVOICE FOR`,
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,
                    registeration: typeOfPayment,
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
                            member_category_description: subscribedProductDetails.member_category_description,
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
                fsSync.mkdirSync(pdfDirectory, { recursive: true });
            }

            const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceData, pdfFilePath);

            const pdfBuffer = await fs1.readFile(pdfFilePath);
            cart.typeOfPayment = typeOfPayment;
            await prisma.upgrade_member_ship_cart.create({
                data: {
                    user_id: user.id,
                    gtin_product_id: value.new_subscription_product_Id,
                    transaction_id: transactionId,
                    registered_product_transaction_id: user.transaction_id,
                    status: 0,
                    cart: JSON.stringify(cart),
                }
            });

            await prisma.member_documents.create({
                data: {
                    type: `${value.subType === "UPGRADE" ? "upgrade_invoice" : "downgrade_invoice"}`,
                    document: `/uploads/documents/MemberRegInvoice/${pdfFilename}`,
                    transaction_id: transactionId,
                    user_id: user.id,
                    doc_type: 'member_document',
                    status: 'pending',
                    uploaded_by: 'admin@gs1sa.link',
                }
            });

            // Send email with invoice
            const subject = `GS1 Saudi Arabia ${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription Request`;
            const emailContent = `This is an automated invoice of your ${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
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

            return { email: user.email, user: user };
        }, { timeout: 40000 });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription invoice requested by ${req?.admin?.email} for ${result?.email}`,
                admin_id: req.admin.adminId,
                user_id: result.user.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription invoice requested by member ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }

        let gtinSubscriptionHistoryData = [{
            transaction_id: transactionId,
            pkg_id: value.new_subscription_product_Id,
            user_id: value.user_id,
            price: registeration_fee + yearly_fee,
            request_type: 'upgrade',
        }
        ]


        await createGtinSubscriptionHistory(gtinSubscriptionHistoryData);

        await updateUserPendingInvoiceStatus(result.user.id);
        // make conditionaal rendering for email
        res.status(200).json({
            message: `${value.subType === "UPGRADE" ? "Upgrade" : "Downgrade"} Subscription invoice created` + (result?.email ? ` and sent to ${result.email} successfully` : "")
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const addAdditionalProductsSchema = Joi.object({
    user_id: Joi.string().required(),
    // additional_barcodes: Joi.number().required(),
    // subType: Joi.string().valid('UPGRADE', 'DOWNGRADE').required(),
    gtinUpgradeProductId: Joi.string().required(),
});



export const addAdditionalProductsRequest = async (req, res, next) => {
    // Validate the request body
    const { error, value } = addAdditionalProductsSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.users.findUnique({
                where: { id: value.user_id },
                include: { carts: true },
            });

            if (!user) {
                throw createError(404, 'User not found');
            }

            // fetch  data from gtin_upgrade_pricing table 
            const gtinUpgradePricing = await prisma.gtin_upgrade_pricing.findUnique({
                where: { id: value.gtinUpgradeProductId },
            });

            if (!gtinUpgradePricing) {
                throw createError(404, 'GTIN upgrade pricing not found');
            }
            console.log("gtinUpgradePricing", gtinUpgradePricing);

            const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
                where: { user_id: value.user_id, isDeleted: false },
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

            const randomTransactionIdLength = 10;
            const transactionId = generateRandomTransactionId(randomTransactionIdLength);


            let cart = user.carts[0];
            let cartData = JSON.parse(cart.cart_items);
            cart.cart_items = []

            cart.cart_items.push({
                productName: `${gtinUpgradePricing.total_no_of_barcodes} Barcodes`,
                registration_fee: 0,
                yearly_fee: gtinUpgradePricing.price,
            });

            let gtinSubscriptionHistoryData = [{
                transaction_id: transactionId,
                pkg_id: gtinSubscriptions.id, // no needed in case of additional gtin
                additional_products_id: value.gtinUpgradeProductId,
                user_id: value.user_id,
                price: gtinUpgradePricing.price,
                request_type: 'additional_gtin',
            }
            ]

            console.log("gtinSubscriptionHistoryData", gtinSubscriptionHistoryData);



            await createGtinSubscriptionHistory(gtinSubscriptionHistoryData);


            cart.total = gtinUpgradePricing.price;
            cart.transaction_id = transactionId;
            let typeOfPayment = `ADDITIONAL GTIN invoice for ${gtinUpgradePricing.total_no_of_barcodes} barcodes`;
            // Generate an invoice
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const invoiceData = {
                topHeading: "INVOICE",
                secondHeading: "ADDITIONAL GTIN INVOICE FOR",
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,

                    registeration: typeOfPayment,
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
            cart.typeOfPayment = typeOfPayment;
            // insert into upgrade_member_ship_cart
            await prisma.upgrade_member_ship_cart.create({
                data: {
                    user_id: user.id,
                    gtin_product_id: value.gtinUpgradeProductId,
                    transaction_id: transactionId,
                    registered_product_transaction_id: user.transaction_id,
                    status: 0,
                    cart: JSON.stringify(cart),
                }
            });


            await prisma.member_documents.create({
                data: {
                    type: 'additional_gtin_invoice',
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
            const emailContent = `This is an automated invoice of your GTIN subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
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



            return { email: user.email, user: user }
        }, { timeout: 40000 });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Upgrade invoice requested by ${req?.admin?.email} for ${result?.email}`,
                admin_id: req.admin.adminId,
                user_id: result.user.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `Upgrade invoice requested by member ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }



        await updateUserPendingInvoiceStatus(result.user.id);

        res.status(200).json({ message: `Upgrade invoice created & sent to ${result} successfully` });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


const addAdditionalGlnSchema = Joi.object({
    userId: Joi.string().required(),
    // additional_barcodes: Joi.number().required(),
    // subType: Joi.string().valid('UPGRADE', 'DOWNGRADE').required(),
    additionalGlnId: Joi.string().required(),
    otherProductSubscriptionId: Joi.string().required(),

});

export const addAdditionalGlnRequest = async (req, res, next) => {
    // Validate the request body
    const { error, value } = addAdditionalGlnSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.users.findUnique({
                where: { id: value.userId },
                include: { carts: true },
            });

            if (!user) {
                throw createError(404, 'User not found');
            }

            // fetch  data from gtin_upgrade_pricing table 
            const additionalGlnDetails = await prisma.gln_upgrade_pricing.findUnique({
                where: { id: value.additionalGlnId },
            });

            if (!additionalGlnDetails) {
                throw createError(404, 'GLN upgrade pricing not found');
            }
            console.log("additionalGlnDetails", additionalGlnDetails);

            // fetch gtin_subcriptions data from gtin_subcriptions table
            const gtinProductDetails = await prisma.gtin_subcriptions.findFirst({
                where: { user_id: value.userId, isDeleted: false },
                include: {
                    gtin_product: true // Include the associated gtin_product
                }
            });

            // const glnSubscriptions = await prisma.other_products_subcriptions.findFirst({
            //     where: { user_id: value.userId, id: value.otherProductSubscriptionId },
            //     include: {
            //         product: true // Include the associated gtin_product
            //     }

            // });

            // if (!glnSubscriptions) {
            //     throw createError(404, 'GLN subscription not found');
            // }


            // Calculate the total number of barcodes after adding the new ones

            const randomTransactionIdLength = 10;
            const transactionId = generateRandomTransactionId(randomTransactionIdLength);


            let cart = user.carts[0];
            let cartData = JSON.parse(cart.cart_items);
            cart.cart_items = []

            cart.cart_items.push({
                productName: `${additionalGlnDetails.total_no_of_gln} GLN`,
                registration_fee: 0,
                yearly_fee: additionalGlnDetails.price,
            });


            let otherProductsSubscriptionHistoryData = [
                {
                    transaction_id: transactionId,
                    product_id: value.otherProductSubscriptionId,
                    user_id: value.userId,
                    price: additionalGlnDetails.price,
                    request_type: 'additional_gln',
                    additional_gln_id: additionalGlnDetails.id,
                }
            ]

            await createOtherProductsSubscriptionHistory(otherProductsSubscriptionHistoryData);


            cart.total = additionalGlnDetails.price;
            cart.transaction_id = transactionId;
            let typeOfPayment = `ADDITIONAL GLN invoice for ${additionalGlnDetails.total_no_of_gln} GLN`;
            // Generate an invoice
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const invoiceData = {
                topHeading: "INVOICE",
                secondHeading: "ADDITIONAL GLN INVOICE FOR",
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,

                    registeration: typeOfPayment,
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
                            member_category_description: gtinProductDetails?.gtin_product?.member_category_description,
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
            cart.typeOfPayment = typeOfPayment;
            // insert into upgrade_member_ship_cart
            await prisma.add_gln_cart.create({
                data: {
                    user_id: user.id,
                    new_gln_id: value.additionalGlnId,
                    other_products_subscription_id: value.otherProductSubscriptionId,
                    transaction_id: transactionId,
                    registered_product_transaction_id: user.transaction_id,
                    status: 0,
                    cart: JSON.stringify(cart),
                }
            });


            await prisma.member_documents.create({
                data: {
                    type: 'additional_gln_invoice',
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
            const subject = 'GS1 Saudi Arabia Membership Upgrade GLN Request';
            const emailContent = `This is an automated invoice of your additional GLN. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
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



            return { email: user.email, user: user }
        }, { timeout: 40000 });
        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Additional GLN invoice requested by ${req?.admin?.email} for ${result?.email}`,
                admin_id: req.admin.adminId,
                user_id: result.user.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `Additional GLN invoice requested by member ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }


        await updateUserPendingInvoiceStatus(result.user.id);

        try {
            res.status(200).json({ message: 'Add GLN invoice created' + (result?.email ? ` and sent to ${result.email} successfully` : '') });
        } catch (error) {
            console.error(error);
            next(error);
        }

    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const approveAdditionalProductsRequest = async (req, res, next) => {


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

        });

        if (!upgradeCart) {
            return res.status(404).send('Upgrade membership cart not found');
        }

        console.log("upgradeCart", upgradeCart);
        const gtin_upgrade_pricing = await prisma.gtin_upgrade_pricing.findUnique({
            where: { id: upgradeCart.gtin_product_id },
        });


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

        const totalBarcodesToAdd = gtin_upgrade_pricing.total_no_of_barcodes;
        let gtinUpgradePricing = gtin_upgrade_pricing;
        // Update gtin_subscription_limit in gtin_subscriptions
        const updateResponse = await prisma.gtin_subcriptions.updateMany({
            where: {
                user_id: userId,
                isDeleted: false

            },
            data: {
                gtin_subscription_limit: {
                    increment: totalBarcodesToAdd,
                },

                gtin_subscription_total_price: {
                    increment: gtinUpgradePricing.price,
                },

            },
        });

        if (updateResponse.count === 0) {
            return res.status(404).send('GTIN subscription not found for the user');
        }


        //  update gitn_subscription_history table

        await prisma.gtin_subscription_histories.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                request_type: 'additional_gtin',

            },
            data: {
                status: 'approved',
                admin_id: req.admin.adminId,
            }
        });




        let emailContent = `Thank you for upgrading your membership. Please find the attached receipt for your reference.`;
        let gcpGLNIDUpdated = false;
        let oldGcpGLNID = user.gcpGLNID;




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
            topHeading: "RECEIPT",
            secondHeading: "RECEIPT FOR ADDITIONAL GTIN",
            memberData: {
                registeration: `Receipt for additional ${gtinUpgradePricing.total_no_of_barcodes} barcodes`,
                qrCodeDataURL: qrCodeDataURL,
                // upgradeDetails: `Receipt for upgrade of ${totalBarcodesToAdd} barcodes`,
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
                        // it's member_category_description not productName 
                        member_category_description: user?.membership_category
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


        // update invoice status to approved
        await prisma.member_documents.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'additional_gtin_invoice',
            },
            data: {
                status: 'approved',
            },
        });


        // delete bank slip delete many
        await prisma.member_documents.deleteMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'bank_slip',
            },
        });



        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Membership upgraded by adding ${totalBarcodesToAdd} GTIN`,
                admin_id: req.admin.adminId,
                user_id: userId,

            }
            await createAdminLogs(adminLog);
        }


        await updateUserPendingInvoiceStatus(userId);


        res.status(200).json({ message: 'Membership request approved successfully and receipt sent to user email.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
export const approveAdditionalGlnRequest = async (req, res, next) => {

    const schema = Joi.object({
        transactionId: Joi.string().required(),
        userId: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { transactionId, userId } = value;
    console.log("trnaactioId", transactionId)
    console.log("userId", userId)
    try {
        // Fetch upgrade cart
        const upgradeCart = await prisma.add_gln_cart.findFirst({
            where: {
                transaction_id: transactionId,
                user_id: userId,
            },
            include: {
                other_products_subcriptions: {
                    include: {
                        product: true
                    }
                },
                gln_upgrade_pricing: true

            }


        });

        let otherProductSubscription = upgradeCart.other_products_subcriptions;
        let gln_upgrade_pricing = upgradeCart.gln_upgrade_pricing; // this is the new gln product
        let otherProductSubscriptionProduct = otherProductSubscription.product;


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

        const totalGlnToAdd = gln_upgrade_pricing.total_no_of_gln;

        // user yealy fee
        let yearly_fee = gln_upgrade_pricing.price;


        // Update gtin_subscription_limit in gtin_subscriptions
        const updateResponse = await prisma.other_products_subcriptions.update({
            where: {
                id: otherProductSubscription.id,
            },
            data: {
                other_products_subscription_limit: {
                    increment: totalGlnToAdd,
                },
                other_products_subscription_total_price: {
                    increment: yearly_fee,
                },
            },
        });


        if (!updateResponse) {
            throw createError(404, 'GLN subscription not found for the user');
        }

        //  update other_products_subscription_history table

        await prisma.other_products_subscription_histories.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                request_type: 'additional_gln',

            },
            data: {
                status: 'approved',
                admin_id: req.admin.adminId,
            }

        });


        let emailContent = `Thank you for upgrading your membership. Please find the attached receipt for your reference.`;

        let cart = user.carts[0];

        cart.cart_items = []

        cart.cart_items.push({
            productName: `Additional GLN (${totalGlnToAdd} GLN)`, // this is the new gln product (gln_upgrade_pricing
            registration_fee: 0,
            yearly_fee: yearly_fee,
        });
        cart.total = yearly_fee;
        cart.transaction_id = transactionId;

        // Generate receipt
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const receiptData = {
            topHeading: "RECEIPT",
            secondHeading: "RECEIPT FOR ADDITIONAL GLN",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                registeration: `Receipt for additional ${totalGlnToAdd} GLN`,
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
                        member_category_description: otherProductSubscriptionProduct.product_name,
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

        // Delete the add_gln_cart record
        await prisma.add_gln_cart.delete({
            where: { id: upgradeCart.id },
        });


        // update invoice status to approved
        await prisma.member_documents.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'additional_gln_invoice',
            },
            data: {
                status: 'approved',
            },
        });

        // delete bank slip delete many
        await prisma.member_documents.deleteMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'bank_slip',
            },
        });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Additional GLN invoice approved by ${req?.admin?.email} for ${user?.email}`,
                admin_id: req.admin.adminId,
                user_id: userId

            }
            await createAdminLogs(adminLog);
        }

        await updateUserPendingInvoiceStatus(userId);


        res.status(200).json({ message: 'Membership request approved successfully and receipt sent to user email.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const approveMembershipRequest = async (req, res, next) => {
    const schema = Joi.object({
        transactionId: Joi.string().required(),
        userId: Joi.string().required(),
        invoiceType: Joi.string().valid('upgrade_invoice', 'downgrade_invoice').required(),
    });

    const { error, value } = schema.validate(req.body);


    try {
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { transactionId, userId, invoiceType } = value;

        const bankSlipDocuments = await prisma.member_documents.findMany({
            where: {
                user_id: userId,
                transaction_id: transactionId,
                type: 'bank_slip',
            }
        });
        if (bankSlipDocuments.length === 0) {
            throw createError(400, `No bank slip documents found for the transaction ID: ${transactionId}`);
        }

        // Fetch upgrade cart
        const upgradeCart = await prisma.upgrade_member_ship_cart.findFirst({
            where: {
                transaction_id: transactionId,
                user_id: userId,
            },

        });

        if (!upgradeCart) {
            throw createError(404, 'Upgrade membership cart not found');
        }

        const gtinProduct = await prisma.gtin_products.findUnique({
            where: { id: upgradeCart.gtin_product_id },
        });

        if (!gtinProduct) {
            throw createError(404, 'GTIN product not found');
        }


        // Fetch user data
        const user = await prisma.users.findUnique({
            where: { id: userId },
            include: {
                carts: true,
            },
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        const totalBarcodesToAdd = gtinProduct.total_no_of_barcodes;

        let emailContent = `Your request for changing membership has been approved. Please find the attached documents for your reference.`;



        // Check for special cases and update gcpGLNID and GLN if necessary

        let gcpGLNID = user.gcpGLNID;
        let gln = user.gln;

        gcpGLNID = `628${gtinProduct.gcp_start_range}`;
        gln = generateGTIN13(gcpGLNID); // Replace with your actual GTIN generation logic
        // don't change for now
        // expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());

        // Update user with new gcpGLNID and GLN
        await prisma.users.update({
            where: { id: userId },
            data: {
                gcpGLNID: gcpGLNID,
                gln: gln,
                // gcp_expiry: expiryDate, TODO: check this do we need to chane expiry on subscripiton update
                // other fields as necessary
            },
        });



        //  use calculateSubscriptionPrice function to calculate the price
        const fetchPrice = await calculateSubscriptionPrice(user.id, gtinProduct.id)
        //    insert new record in gtin_subcriptions table with new subscription
        const updateResponse = await prisma.gtin_subcriptions.updateMany({
            // update based on the transaction ID
            where: {
                transaction_id: upgradeCart.registered_product_transaction_id,
                user_id: userId, isDeleted: false
            },
            data: {
                deleted_at: new Date(),
                isDeleted: true,
                gtin_subscription_limit: totalBarcodesToAdd,
            }
        });

        if (!updateResponse) {
            throw createError(404, 'GTIN subscription not found for the user');
        }



        await prisma.gtin_subcriptions.create({
            data: {
                user_id: userId,
                pkg_id: gtinProduct.id,
                transaction_id: upgradeCart.registered_product_transaction_id,
                gtin_subscription_limit: totalBarcodesToAdd,
                gtin_subscription_counter: 0,
                //     registration_fee: user.membership_category === "non_med_category" ? subscribedProductDetails.member_registration_fee : subscribedProductDetails.med_registration_fee,
                // yearly_fee: user.membership_category === "non_med_category" ? subscribedProductDetails.gtin_yearly_subscription_fee : subscribedProductDetails.med_yearly_subscription_fee,
                gtin_subscription_total_price: fetchPrice.finalPrice - fetchPrice.newRegistrationFee,
                price: fetchPrice.newRegistrationFee,
                status: 'active',
                expiry_date: user.gcp_expiry,
                request_type: 'upgrade',
                createdBy: req?.admin?.adminId,

            }
        });

        await prisma.gtin_subscription_histories.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                request_type: 'upgrade',


            },
            data: {
                status: 'approved',
                admin_id: req?.admin?.adminId,

            }
        });



        // Update product's gcp_start_range
        await prisma.gtin_products.update({
            where: { id: gtinProduct.id },
            data: {
                gcp_start_range: String(parseInt(gtinProduct.gcp_start_range) + 1),
            },
        });


        let cart = {
            cart_items: [],
        }

        cart.cart_items = []

        cart.cart_items.push({
            // check user category and add price accordingly
            registration_fee: user.membership_category === "non_med_category" ? gtinProduct.member_registration_fee : gtinProduct.med_registration_fee,
            yearly_fee: user.membership_category === "non_med_category" ? gtinProduct.gtin_yearly_subscription_fee : gtinProduct.med_yearly_subscription_fee,
            productName: gtinProduct.member_category_description,

        });

        cart.transaction_id = transactionId;
        // Generate receipt
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');

        const receiptData = {
            topHeading: "RECEIPT",
            secondHeading: "RECEIPT FOR MEMBERSHIP UPGRADE",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                registeration: `Receipt for upgrading membership to ${gtinProduct.member_category_description}`,
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
                        member_category_description: gtinProduct.member_category_description,
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
        // if (gcpGLNIDUpdated) {
        //     emailContent = `Thank you for upgrading your membership. Your GPC/GLN has been updated from ${oldGcpGLNID} to ${user.gcpGLNID}. Please find the attached receipt for your reference.`;
        // }






        const CertificateData = {
            BACKEND_URL: BACKEND_URL,
            qrCodeDataURL: qrCodeDataURL,
            user: {
                company_name_eng: user?.company_name_eng,
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
                gln: gln,
                memberID: user?.memberID,
                // gcp_expiry:
                // use updated expiry date used above
                expiryDate: user?.gcp_expiry?.toISOString()?.split('T')[0],
            },
            // userUpdateResult.gcp_expiry, update this to add only date adn remove time
            expiryDate: user?.gcp_expiry?.toISOString()?.split('T')[0],
            explodeGPCCode: []
        };



        // Generate PDF from EJS template
        const certificatePdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberCertificates');
        // use current date time to generate unique file name
        let certificatePdfFilename = `${user.company_name_eng}-Renewed_Certificate-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
        const certPdfFilePath = path.join(certificatePdfDirectory, certificatePdfFilename);
        if (!fsSync.existsSync(certificatePdfDirectory)) {
            fsSync.mkdirSync(certificatePdfDirectory, { recursive: true });
        }

        const Certificatepath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'certificate.ejs'), CertificateData, certPdfFilePath, true);
        const certificatepdfBuffer = await fs1.readFile(Certificatepath);




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
                {
                    filename: `Certificate-${user.company_name_eng}-${transactionId}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`,
                    content: certificatepdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        });


        // update invoice status to approved
        await prisma.member_documents.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'upgrade_invoice',
            },
            data: {
                status: 'approved',
            },
        });

        // delete the bank slip documents
        await prisma.member_documents.deleteMany({
            where: {
                user_id: userId,
                transaction_id: transactionId,
                type: 'bank_slip',
            }
        });


        // Delete the upgrade_membership_cart record
        await prisma.upgrade_member_ship_cart.delete({
            where: { id: upgradeCart.id },
        });




        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `GS1 Membership ` + invoiceType + ` approved by ${req?.admin?.email} for ${user?.email}`,
                admin_id: req.admin.adminId,
                user_id: userId

            }
            await createAdminLogs(adminLog);
        }
        await updateUserPendingInvoiceStatus(userId);


        res.status(200).json({ message: 'Membership request approved successfully and receipt sent to user email.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};





const downgradeMembershipSchema = Joi.object({
    user_id: Joi.string().required(),
    // additional_barcodes: Joi.number().required(),
    // subType: Joi.string().valid('UPGRADE', 'DOWNGRADE').required(),
    new_subscription_product_Id: Joi.string().required(),
});




export const downgradeMemberSubscriptionRequest = async (req, res, next) => {
    // Validate the request body
    const { error, value } = downgradeMembershipSchema.validate(req.body);

    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {


        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            const user = await prisma.users.findUnique({
                where: { id: value.user_id },
                include: { carts: true },
            });

            if (!user) {
                throw createError(404, 'User not found');
            }

            const subscribedProductDetails = await prisma.gtin_products.findUnique({
                where: { id: value.new_subscription_product_Id },
            });

            if (!subscribedProductDetails) {
                throw createError(404, 'New GTIN subscription not found');
            }

            const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
                where: {
                    user_id: value.user_id, isDeleted: false

                },
                include: { gtin_product: true }
            });

            if (!gtinSubscriptions) {
                throw createError(404, 'Old GTIN subscription not found');
            }

            const totalBarcodes = gtinSubscriptions.gtin_subscription_limit +
                gtinSubscriptions.gtin_subscription_counter +
                subscribedProductDetails.total_no_of_barcodes;

            const transactionId = generateRandomTransactionId(10);

            let cart = { cart_items: [] };
            // if subType is UPGRADE then in registration fee add final price and in yearly fee add final - registration fee



            let newDowngradeYearlyFee = user.membership_category === "non_med_category" ?
                subscribedProductDetails.member_registration_fee :
                subscribedProductDetails.med_registration_fee;
            let newDowngradeRegistrationFee = user.membership_category === "non_med_category" ?
                subscribedProductDetails.gtin_yearly_subscription_fee :
                subscribedProductDetails.med_yearly_subscription_fee;

            let gtinSubscriptionHistoryData = [{
                transaction_id: transactionId,
                pkg_id: value.new_subscription_product_Id,
                user_id: user.id,
                price: 0,
                status: 'pending',
                request_type: 'downgrade',
            }
            ]


            await createGtinSubscriptionHistory(gtinSubscriptionHistoryData);


            cart.cart_items.push({
                registration_fee: 0,
                yearly_fee: 0,
                newDowngradeYearlyFee: newDowngradeYearlyFee,
                newDowngradeRegistrationFee: newDowngradeRegistrationFee,
                productName: subscribedProductDetails.member_category_description,
            });
            cart.transaction_id = transactionId;
            let typeOfPayment = `Downgrade Subscription invoice for ${subscribedProductDetails.member_category_description}`;
            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
            const invoiceData = {
                topHeading: "INVOICE",
                type: 'downgrade',
                secondHeading: `Downgrade Subscription invoice for ${subscribedProductDetails.member_category_description}`,
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,
                    registeration: typeOfPayment,
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
                            member_category_description: subscribedProductDetails.member_category_description,
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
                fsSync.mkdirSync(pdfDirectory, { recursive: true });
            }

            const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceData, pdfFilePath);

            const pdfBuffer = await fs1.readFile(pdfFilePath);
            cart.typeOfPayment = typeOfPayment;
            await prisma.upgrade_member_ship_cart.create({
                data: {
                    user_id: user.id,
                    gtin_product_id: value.new_subscription_product_Id,
                    transaction_id: transactionId,
                    registered_product_transaction_id: user.transaction_id,
                    status: 0,
                    cart: JSON.stringify(cart),
                }
            });

            await prisma.member_documents.create({
                data: {
                    type: `${value.subType === "UPGRADE" ? "upgrade_invoice" : "downgrade_invoice"}`,
                    document: `/uploads/documents/MemberRegInvoice/${pdfFilename}`,
                    transaction_id: transactionId,
                    user_id: user.id,
                    doc_type: 'member_document',
                    status: 'pending',
                    uploaded_by: 'admin@gs1sa.link',
                }
            });

            // Send email with invoice
            const subject = 'GS1 Saudi Arabia Membership Downgrade Subscription Request';
            const emailContent = `This is an automated invoice of your Downgrade Subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`;
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



            return { user: user, transactionId: transactionId };
        }, { timeout: 50000 });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Downgrade Subscription invoice created by ${req?.admin?.email} for ${result?.user?.email}`,
                admin_id: req.admin.adminId,
                user_id: result.user.id

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `Downgrade Subscription invoice created`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }



        await updateUserPendingInvoiceStatus(result.user.id);

        res.status(200).json({ message: `Downgrade Subscription invoice created + (result?.user?.email ? '& sent to ' + result?.user?.email : '')` });

    } catch (error) {
        console.error(error);
        next(error);
    }
};


// export const downgradeMemberSubscriptionRequest = async (req, res, next) => {
//     // Validate the request body
//     const { error, value } = downgradeMembershipSchema.validate(req.body);


//     try {

//         if (error) {
//             // return next(createError(400, error.details[0].message));
//             throw createError(400, error.details[0].message);
//         }


//         const user = await prisma.users.findUnique({
//             where: { id: value.user_id },
//             include: {
//                 carts: true,
//             },

//         });

//         if (!user) {
//             throw createError(404, 'User not found');
//         }

//         // fetch  data from gtin_upgrade_pricing table 
//         const gtinUpgradePricing = await prisma.gtin_upgrade_pricing.findUnique({
//             where: { id: value.gtin_product_id },
//         });

//         if (!gtinUpgradePricing) {
//             throw createError(404, 'GTIN upgrade pricing not found');
//         }
//         console.log("gtinUpgradePricing", gtinUpgradePricing);


//         // get gtin_products data baed of  current_gtin_subscription_id
//         const gtinSubscriptions = await prisma.gtin_products.findFirst({
//             where: { id: value.current_gtin_subscription_id },
//         });

//         if (!gtinSubscriptions) {
//             throw createError(404, 'GTIN subscription not found');
//         }

//         const newGtinSubscriptions = await prisma.gtin_products.findFirst({
//             where: { total_no_of_barcodes: gtinUpgradePricing.total_no_of_barcodes },
//         });

//         if (!newGtinSubscriptions) {
//             throw createError(404, 'New GTIN subscription not found');
//         }


//         const randomTransactionIdLength = 10; // adjust the length as needed 2*5 = 10 for 10 digit transaction id
//         const transactionId = generateRandomTransactionId(randomTransactionIdLength);


//         let cart = user.carts[0];
//         let cartData = JSON.parse(cart.cart_items);
//         cart.cart_items = []

//         cart.cart_items.push({
//             productName: `${gtinUpgradePricing.total_no_of_barcodes} Barcodes`,
//             registration_fee: 0,
//             // yearly_fee: gtinUpgradePricing.price,
//             yearly_fee: 0,
//         });
//         // cart.total = gtinUpgradePricing.price;
//         cart.total = 0;
//         cart.transaction_id = transactionId;

//         // Generate an invoice
//         const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
//         const invoiceData = {
//             topHeading: "INVOICE",
//             secondHeading: "DOWNGRADE INVOICE FOR",
//             memberData: {
//                 qrCodeDataURL: qrCodeDataURL,

//                 registeration: `DOWNGRADE INVOCIE TO ${gtinSubscriptions?.member_category_description} to ${newGtinSubscriptions?.member_category_description}`,
//                 // Assuming $addMember->id is already known
//                 company_name_eng: user.company_name_eng,
//                 mobile: user.mobile,
//                 address: {
//                     zip: user.zip_code,
//                     countryName: user.country,
//                     stateName: user.state,
//                     cityName: user.city,
//                 },
//                 companyID: user.companyID,
//                 membership_otherCategory: user.membership_category,
//                 gtin_subscription: {
//                     products: {
//                         member_category_description: newGtinSubscriptions?.member_category_description,
//                     },
//                 },
//             },


//             cart: cart,

//             currentDate: {
//                 day: new Date().getDate(),
//                 month: new Date().getMonth() + 1, // getMonth() returns 0-11
//                 year: new Date().getFullYear(),
//             },




//             company_details: {
//                 title: 'Federation of Saudi Chambers',
//                 account_no: '25350612000200',
//                 iban_no: 'SA90 1000 0025 3506 1200 0200',
//                 bank_name: 'Saudi National Bank - SNB',
//                 bank_swift_code: 'NCBKSAJE',
//             },
//             BACKEND_URL: BACKEND_URL,
//         };


//         const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
//         const pdfFilename = `Receipt-${user.company_name_eng}-${transactionId}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
//         const pdfFilePath = path.join(pdfDirectory, pdfFilename);

//         if (!fsSync.existsSync(pdfDirectory)) {
//             fsSync.mkdir(pdfDirectory, { recursive: true });
//         }

//         const Receiptpath = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceData, pdfFilePath);

//         // Read the file into a buffer
//         const pdfBuffer = await fs1.readFile(pdfFilePath);

//         // insert into upgrade_member_ship_cart
//         await prisma.upgrade_member_ship_cart.create({
//             data: {
//                 user_id: user.id,
//                 gtin_product_id: value.gtin_product_id,
//                 transaction_id: transactionId,
//                 registered_product_transaction_id: user.transaction_id,
//                 status: 0,
//             }
//         });


//         await prisma.member_documents.create({
//             data: {
//                 type: 'downgrade_invoice',
//                 document: `/uploads/documents/MemberRegInvoice/${pdfFilename}`,
//                 transaction_id: transactionId,
//                 user_id: user.id,
//                 doc_type: 'member_document',
//                 status: 'pending',
//                 // TODO: take email form current admin token
//                 // uploaded_by: req.admin.email, // Assuming the admin is logged in
//                 uploaded_by: 'admin@gs1sa.link', // Assuming the admin is logged in
//             }

//         });

//         // Send email with invoice
//         const subject = 'GS1 Saudi Arabia Membership Upgrade Request';
//         const emailContent = `This is an automated email to confirm that your membership downgrade request has been received. Please find the attached invoice for your reference.`;
//         const attachments = [
//             {
//                 filename: pdfFilename,
//                 content: pdfBuffer,
//                 contentType: 'application/pdf',
//             },
//         ];

//         await sendEmail({
//             fromEmail: ADMIN_EMAIL,
//             toEmail: user.email,
//             subject: subject,

//             htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
//             attachments: attachments
//         });

//         // Insert Member History log
//         const logData = {
//             subject: 'Downgrade invoice created',
//             // user user memberId
//             // member_id: userUpdateResult.memberID,
//             user_id: user?.id,
//             // TODO: take email form current admin token
//             admin_id: 'admin@gs1sa.link',

//         }


//         TODO: // chec this
//         // if (req?.admin.id) {
//         //     logData.admin_id = admin_email;
//         // logData.created_by_admin = 1;
//         // }

//         await createMemberLogs(logData);


//         res.status(200).json({ message: `Downgrade invoice created & sent to ${user.email} successfully` });
//     } catch (error) {
//         console.error(error);
//         next(error)
//     }
// }




export const approveDowngradeMembershipRequest = async (req, res, next) => {


    const schema = Joi.object({
        transactionId: Joi.string().required(),
        userId: Joi.string().required(),
        // invoiceType: Joi.string().valid('upgrade_invoice', 'downgrade_invoice').required(),
    });

    const { error, value } = schema.validate(req.body);


    try {
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { transactionId, userId } = value;

        // const bankSlipDocuments = await prisma.member_documents.findMany({
        //     where: {
        //         user_id: userId,
        //         transaction_id: transactionId,
        //         type: 'bank_slip',
        //     }
        // });
        // if (bankSlipDocuments.length === 0) {
        //     throw createError(400, `No bank slip documents found for the transaction ID: ${transactionId}`);
        // }

        // Fetch upgrade cart
        const upgradeCart = await prisma.upgrade_member_ship_cart.findFirst({
            where: {
                transaction_id: transactionId,
                user_id: userId,
            },

        });

        if (!upgradeCart) {
            throw createError(404, 'Upgrade membership cart not found');
        }

        const gtinProduct = await prisma.gtin_products.findUnique({
            where: { id: upgradeCart.gtin_product_id },
        });

        if (!gtinProduct) {
            throw createError(404, 'GTIN product not found');
        }


        // Fetch user data
        const user = await prisma.users.findUnique({
            where: { id: userId },
            include: {
                carts: true,
            },
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        const totalBarcodesToAdd = gtinProduct.total_no_of_barcodes;

        let emailContent = `Your request for changing membership has been approved.`;



        // Check for special cases and update gcpGLNID and GLN if necessary

        // let gcpGLNID = user.gcpGLNID;
        // let gln = user.gln;
        // let expiryDate = new Date();
        // if (value.invoiceType === 'downgrade_invoice') {
        //     expiryDate = user.gcp_expiry;
        // } else {
        //     gcpGLNID = `628${gtinProduct.gcp_start_range}`;
        //     gln = generateGTIN13(gcpGLNID); // Replace with your actual GTIN generation logic
        //     expiryDate = new Date(expiryDate.getFullYear() + 1, expiryDate.getMonth(), expiryDate.getDate());
        // }
        // // Update user with new gcpGLNID and GLN
        // await prisma.users.update({
        //     where: { id: userId },
        //     data: {
        //         gcpGLNID: gcpGLNID,
        //         gln: gln,
        //         gcp_expiry: expiryDate,
        //         // other fields as necessary
        //     },
        // });


        const updateResponse = await prisma.gtin_subcriptions.updateMany({
            // update based on the transaction ID
            where: {
                transaction_id: upgradeCart.registered_product_transaction_id,
                user_id: userId, isDeleted: false
            },
            data: {
                deleted_at: new Date(),
                isDeleted: true,
                gtin_subscription_limit: totalBarcodesToAdd,
            }
        });



        if (!updateResponse) {
            throw createError(404, 'GTIN subscription not found for the user');
        }

        const getUpdatedGtinSubscription = await prisma.gtin_subcriptions.findFirst({
            where: {
                transaction_id: upgradeCart.registered_product_transaction_id,
                user_id: userId, isDeleted: false
            },

        });

        //    insert new record in gtin_subcriptions table with new subscription
        await prisma.gtin_subcriptions.create({
            data: {
                user_id: userId,
                pkg_id: gtinProduct.id,
                transaction_id: upgradeCart.registered_product_transaction_id,
                gtin_subscription_limit: totalBarcodesToAdd,
                gtin_subscription_counter: 0,
                //     registration_fee: user.membership_category === "non_med_category" ? subscribedProductDetails.member_registration_fee : subscribedProductDetails.med_registration_fee,
                // yearly_fee: user.membership_category === "non_med_category" ? subscribedProductDetails.gtin_yearly_subscription_fee : subscribedProductDetails.med_yearly_subscription_fee,
                gtin_subscription_total_price: user.membership_category === "non_med_category" ? gtinProduct.gtin_yearly_subscription_fee : gtinProduct.med_yearly_subscription_fee,
                price: user.membership_category === "non_med_category" ? gtinProduct.member_registration_fee : gtinProduct.med_registration_fee,
                status: 'active',
                expiry_date: user.gcp_expiry,
                request_type: 'downgrade',
                createdBy: 'adminksa@gmail.com', //TODO: change this to current admin email

            }
        });


        await prisma.gtin_subscription_histories.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                request_type: 'downgrade',


            },
            data: {
                status: 'approved',
                admin_id: req?.admin?.adminId,

            }
        });


        // Send email with receipt
        await sendEmail({
            fromEmail: ADMIN_EMAIL, // Replace with your admin email
            toEmail: user.email,
            subject: 'Membership Downgrade Request Approval - GS1 Saudi Arabia',
            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
        });


        // update invoice status to approved
        await prisma.member_documents.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'downgrade_invoice',
            },
            data: {
                status: 'approved',
            },
        });

        // delet the bank slip document
        await prisma.member_documents.deleteMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'bank_slip',
            }
        });

        // Delete the upgrade_membership_cart record
        await prisma.upgrade_member_ship_cart.delete({
            where: { id: upgradeCart.id },
        });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `GS1 Membership Downgrade Request approved by ${req?.admin?.email} for ${user?.email}`,
                admin_id: req.admin.adminId,
                user_id: userId
            }
            await createAdminLogs(adminLog);
        }


        await updateUserPendingInvoiceStatus(userId);

        res.status(200).json({ message: 'Membership downgrade request approved successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
const productSubscriptionSchema = Joi.object({
    productId: Joi.string().required(),
    productIdentifierName: Joi.string().required(),

});

const addMultipleOtherProductSubscriptionsSchema = Joi.object({
    userId: Joi.string().required(),
    subscriptions: Joi.array().items(productSubscriptionSchema).min(1).required(),
});

export const addMultipleOtherProductSubscriptionsAndGenerateInvoice = async (req, res, next) => {
    const { error, value } = addMultipleOtherProductSubscriptionsSchema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    try {
        const { userId, subscriptions } = value;

        const existingUser = await prisma.users.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return next(createError(404, 'User not found'));
        }


        const transactionId = generateRandomTransactionId(10);



        const subscriptionEntries = subscriptions.map(async (sub) => {
            const product = await prisma.other_products.findUnique({
                where: { id: sub.productId },
            });
            return {
                user_id: userId,
                product_id: sub.productId,
                status: "inactive",
                other_products_subscription_total_price:
                    existingUser.membership_category === "non_med_category"
                        ? product.product_subscription_fee
                        : product.med_subscription_fee,
                product_identifier_name: sub.productIdentifierName,
                transaction_id: transactionId, // Assuming all subscriptions in a request share the same transaction ID
            };
        });
        const resolvedSubscriptionEntries = await Promise.all(subscriptionEntries);
        console.log("resolvedSubscriptionEntries", resolvedSubscriptionEntries);
        let totalPrice = resolvedSubscriptionEntries.reduce((acc, entry) => acc + entry.other_products_subscription_total_price, 0);
        console.log("totalPrice", totalPrice);

        await prisma.$transaction(
            resolvedSubscriptionEntries.map(entry => prisma.other_products_subcriptions.create({ data: entry }))
        );

        let cart = { cart_items: [] };



        // add products to cart
        cart.cart_items = resolvedSubscriptionEntries.map(sub => ({
            registration_fee: 0,
            yearly_fee: sub.other_products_subscription_total_price,
            productName: sub.product_identifier_name,
        }));
        // Generate QR code
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        // save transaction id in cart
        cart.transaction_id = transactionId;
        const invoiceDetails = {
            topHeading: "INVOICE",
            secondHeading: "BILL TO",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                // registeration: `New Registration for the year ${new Date().getFullYear()}`,
                registeration: `Addition of other products`,
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
                        member_category_description: subscriptions.map(sub => sub.productIdentifierName).join(', '),
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
            BACKEND_URL: BACKEND_URL
        };




        // Generate and save the invoice PDF
        const pdfFilename = `Invoice-additional-products-${existingUser.company_name_eng}-${transactionId}.pdf`;
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberInvoices');
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        if (!fs.existsSync(pdfDirectory)) {
            fs.mkdirSync(pdfDirectory, { recursive: true });
        }

        await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceDetails, pdfFilePath);
        // Save invoice reference in member_documents
        await prisma.member_documents.create({
            data: {
                type: 'additional_other_products_invoice',
                document: `/uploads/documents/MemberInvoices/${pdfFilename}`,
                transaction_id: transactionId,
                user_id: userId,
                status: 'pending',
                // uploaded_by: req?.admin?.email ? req.admin.email : req.user.email || '',
            }
        });

        // send ivoice in mail to user with attachment
        const pdfBuffer = await fs1.readFile(pdfFilePath);

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: existingUser.email,
            subject: 'Additional Other Products Subscription Invoice - GS1 Saudi Arabia',
            htmlContent: `This is an automated invoice of your additional other products subscription. Please find the attached invoice for your reference. <br><br> Thank you for your continued support. <br><br> Regards, <br> GS1 Saudi Arabia`,
            attachments: [
                {
                    filename: pdfFilename,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        });


        res.status(201).json({
            message: "Subscriptions added and invoice generated successfully",
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


// appvove additional other products subscription request
export const approveAdditionalOtherProductsSubscriptionRequest = async (req, res, next) => {
    const schema = Joi.object({
        transactionId: Joi.string().required(),
        userId: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    let otherProductsSubscriptionHistoryData;
    try {
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { transactionId, userId } = value;

        const user = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw createError(404, 'User not found');
        }

        const subscriptionEntries = await prisma.other_products_subcriptions.findMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
            },
        });

        if (subscriptionEntries.length === 0) {
            throw createError(404, 'No subscription entries found for the transaction ID');
        }

        // fetch other products based on product id


        // Fetch the necessary data from other_products table
        const products = await prisma.other_products.findMany({
            select: {
                id: true,
                total_no_of_barcodes: true,
                product_subscription_fee: true,
                med_subscription_fee: true,
            }
        });
        let activatedOtherProducts = [];
        // Update other_products_subcriptions table for each product
        for (const product of products) {
            console.log("product", product);
            let subscriptionFee = user.membership_category === 'non_med_category'
                ? product.product_subscription_fee
                : product.med_subscription_fee;

            await prisma.other_products_subcriptions.updateMany({
                where: {
                    product_id: product.id,
                    isDeleted: false,
                    transaction_id: transactionId
                },
                data: {
                    other_products_subscription_limit: product.total_no_of_barcodes,
                    other_products_subscription_total_price: subscriptionFee,
                    status: 'active',  // Update the status
                    expiry_date: user.gcp_expiry, // Update the expiry date
                }
            });
            // now get the updated records and push them to the array

            let activatedOtherProduct = await prisma.other_products_subcriptions.findMany({
                where: {
                    product_id: product.id,
                    isDeleted: false,
                    transaction_id: transactionId
                },

            });
            activatedOtherProducts.push(...activatedOtherProduct);
        }

        console.log("activatedOtherProducts", activatedOtherProducts);
        otherProductsSubscriptionHistoryData = activatedOtherProducts.map(item => ({
            ...(item.react_no && { react_no: item.react_no }),
            transaction_id: item.transaction_id,
            product_id: item.product_id,
            user_id: item.user_id,
            price: item.other_products_subscription_total_price + item.price, // add yearly subscription fee and price (registration fee)
            status: 'approved',
            request_type: 'registration',
            expiry_date: item.expiry_date,
            admin_id: req?.admin?.adminId,
        }));

        // await prisma.other_products_subcriptions.updateMany({
        //     where: {
        //         transaction_id: transactionId,
        //         user_id: userId,
        //     },
        //     data: {
        //         status: 'active',
        //     },
        // });

        // update otherproductHistory table
        await createOtherProductsSubscriptionHistory(otherProductsSubscriptionHistoryData);

        await prisma.member_documents.updateMany({
            where: {
                transaction_id: transactionId,
                user_id: userId,
                type: 'additional_other_products_invoice',

            },
            data: {
                status: 'approved',
            },
        });


        // create cart for invoice
        let cart = { cart_items: [] };
        cart.cart_items = subscriptionEntries.map(sub => ({
            registration_fee: 0,
            yearly_fee: sub.other_products_subscription_total_price,
            productName: sub.product_identifier_name,
        }));

        // add transaction id in cart
        cart.transaction_id = transactionId;
        // Generate QR code
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');

        const invoiceDetails = {
            topHeading: "RECIPT",
            secondHeading: "RECEIPT FOR",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                // registeration: `New Registration for the year ${new Date().getFullYear()}`,
                registeration: `Addition of other products`,
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
                        member_category_description: subscriptionEntries.map(sub => sub.product_identifier_name).join(', '),
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
            BACKEND_URL: BACKEND_URL
        };




        // Generate and save the invoice PDF
        const pdfFilename = `Invoice-additional-products-${user.company_name_eng}-${transactionId}.pdf`;
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberInvoices');
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        if (!fs.existsSync(pdfDirectory)) {
            fs.mkdirSync(pdfDirectory, { recursive: true });
        }

        await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), invoiceDetails, pdfFilePath);












        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Additional Other Products Subscription Request approved by ${req?.admin?.email} for ${user?.email}`,
                admin_id: req.admin.adminId,
                user_id: userId
            }
            await createAdminLogs(adminLog);
        }

        await updateUserPendingInvoiceStatus(userId);

        // send mail to user with attachment
        const pdfBuffer = await fs1.readFile(pdfFilePath);

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: user.email,
            subject: 'Additional Other Products Subscription Request Approval - GS1 Saudi Arabia',
            htmlContent: `<br>
            We are pleased to inform you that your additional other products subscription request has been approved. Please find the attached receipt for your reference.<br><br>
            Thank you for your continued support.<br><br>
            Regards,<br>
            GS1 Saudi Arabia`,
            attachments: [
                {
                    filename: pdfFilename,
                    content: pdfBuffer,
                    contentType: 'application/pdf',
                },
            ],
        });

        res.status(200).json({ message: 'Additional other products subscription request approved successfully' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};