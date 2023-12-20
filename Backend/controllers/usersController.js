import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { generateStrongPassword } from '../utils/functions/commonFunction.js';
import { sendEmail, sendOTPEmail } from '../services/emailTemplates.js';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';
import fs from 'fs/promises';
import fs1 from 'fs';


import jwt from 'jsonwebtoken';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import fsSync from 'fs';
import { ADMIN_EMAIL, BACKEND_URL, JWT_EXPIRATION, MEMBER_JWT_SECRET } from '../configs/envConfig.js';
import { generateRandomTransactionId } from '../utils/utils.js';
import { cookieOptions } from '../utils/authUtilities.js';
import { generateGTIN13 } from '../utils/functions/barcodesGenerator.js';

// Define the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const userSchema = Joi.object({
    user_type: Joi.string().max(20),
    slug: Joi.string(),
    location_uk: Joi.string(),
    have_cr: Joi.string(),
    cr_documentID: Joi.string(),
    document_number: Joi.string(),
    fname: Joi.string(),
    lname: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
    image: Joi.string(),
    country: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    po_box: Joi.string(),
    mbl_extension: Joi.string(),
    website: Joi.string(),
    no_of_staff: Joi.string(),
    companyID: Joi.string(),
    district: Joi.string(),
    building_no: Joi.string(),
    additional_number: Joi.string(),
    other_landline: Joi.string(),
    unit_number: Joi.string(),
    qr_corde: Joi.string(),
    email_verified_at: Joi.date(),
    zip_code: Joi.string().max(50),
    verification_code: Joi.number().integer(),
    cr_number: Joi.string(),
    cr_activity: Joi.string(),
    company_name_eng: Joi.string(),
    company_name_arabic: Joi.string(),
    bussiness_activity: Joi.string(),
    other_products: Joi.string().optional(),
    gpc: Joi.string(),
    product_addons: Joi.string(),
    // total: Joi.number(),
    contactPerson: Joi.string(),
    companyLandLine: Joi.string(),
    documents: Joi.string(),
    document: Joi.string(),
    address_image: Joi.string(),
    payment_type: Joi.string(),
    online_payment: Joi.string(),
    remember_token: Joi.string(),
    parent_memberID: Joi.number().integer(),
    invoice_file: Joi.string(),
    otp_status: Joi.number().integer(),
    gcpGLNID: Joi.string().max(50),
    gln: Joi.string().max(50),
    gcp_type: Joi.string().max(50),
    deleted_at: Joi.date(),
    gcp_expiry: Joi.date(),
    memberID: Joi.string(),
    user_id: Joi.string(),
    assign_to: Joi.number().integer(),
    membership_category_id: Joi.string().max(50),
    membership_category: Joi.string().max(50),
    upgradation_disc: Joi.number().integer(),
    upgradation_disc_amount: Joi.number(),
    renewal_disc: Joi.number().integer(),
    renewal_disc_amount: Joi.number(),
    membership_otherCategory: Joi.string().max(50),
    activityID: Joi.number().integer(),
    registration_type: Joi.string().max(10),
    status: Joi.string().valid('active', 'inactive', 'reject', 'suspend'), // TODO: remove status and allow only in update
    industryTypes: Joi.array().items(Joi.object({
        id: Joi.string(),
        name: Joi.string()
    })),


    // Nested cart schema
    cart: Joi.object({
        transaction_id: Joi.string(),
        cart_items: Joi.array().items(Joi.object({
            productID: Joi.string().required(),
            productName: Joi.string(),
            registration_fee: Joi.string(),
            yearly_fee: Joi.string(),
            price: Joi.string(),
            product_type: Joi.string(),
            quotation: Joi.string()
        })),
        total: Joi.number(),
        request_type: Joi.string(),
        payment_type: Joi.string(),
        user_id: Joi.string(),
        receipt: Joi.string(),
        receipt_path: Joi.string(),
        admin_id: Joi.number().integer(),
        assign_to: Joi.number().integer().allow(null),
        discount: Joi.number().allow(null),
    })
});


export const generatePDFGen = async (req, res) => {
    try {
        // Define your dummy data object
        const BACKEND_URL = 'http://localhost:3091';
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const data = {
            memberData: {
                // add New Rigistriont with current date
                registeration: `New Registration ${new Date().toLocaleDateString()}`,
                qrCodeDataURL: qrCodeDataURL,
                // Assuming $addMember->id is already known
                company_name_eng: 'Sample Company',
                mobile: '+966-123-456789',
                address: {
                    zip: '12345',
                    countryName: 'Saudi Arabia',
                    stateName: 'Riyadh',
                    cityName: 'Riyadh City',
                },
                companyID: '1234567890',
                gtin_subscription: {
                    products: {
                        member_category_description: 'Gold Membership',
                    },
                },
            },
            general: {
                service_default_image: 'default_service_image.png',
                logo: 'company_logo.png',
            },
            cart: {
                request_type: 'registration', // Can be 'registration', 'renew', or 'addon'
                transaction_id: 'T123456789',
                payment_type: 'bank_transfer', // Can be 'bank_transfer' or 'Mada/Visa'
                cart_items: [
                    // Item descriptions
                ],
            },
            currentDate: {
                day: new Date().getDate(),
                month: new Date().getMonth() + 1, // getMonth() returns 0-11
                year: new Date().getFullYear(),
            },
            custom_amount: 100, // Example custom amount
            cart: {
                request_type: 'registration', // or 'renew' or 'addon'
                transaction_id: 'T123456789',
                payment_type: 'bank_transfer', // or 'Mada/Visa'
                cart_items: [
                    'Item 1 Description',
                    'Item 2 Description',
                    'Item 3 Description',
                ],
            },
            general: {
                service_default_image: 'default_service_image.png',
                logo: 'company_logo.png',
            },
            company_details: {
                title: 'Sample Company',
                account_no: '1234567890',
                iban_no: 'SA1234567890123456789012',
                bank_name: 'Sample Bank',
                bank_swift_code: 'SAMPLEBANK123',
            },
            BACKEND_URL: BACKEND_URL,
        };
        // Render the EJS template with the dummy data
        const pdfBuffer = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), data, 'invoice4.pdf');

        // Set the response headers and send the PDF as a response
        res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdfBuffer.length });
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// const generatePDF = async (ejsFilePath, data) => {
//     const ejsTemplate = await fs.readFile(ejsFilePath, 'utf-8');
//     const htmlContent = await ejs.render(ejsTemplate, { data });

//     return new Promise((resolve, reject) => {
//         pdf.create(htmlContent, { format: 'A4' }).toBuffer((err, buffer) => {
//             if (err) return reject(err);
//             resolve(buffer);
//         });
//     });
// };


async function convertEjsToPdf(ejsFilePath, data, outputFilePath) {
    try {
        const ejsTemplate = await fs.readFile(ejsFilePath, 'utf-8');
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


export const createUser = async (req, res, next) => {
    try {
        // Validate user data
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            console.log("error")
            console.log(error)
            return next(createError(400, error.details[0].message));
        }
        // Extract user and cart values
        const userValue = { ...value };
        delete userValue.cart; // Remove cart data from userValue
        const cartValue = value.cart;
        // Generate transaction ID for cart
        // Generate a random transaction ID with increased randomness
        const randomTransactionIdLength = 10; // adjust the length as needed 2*5 = 10 for 10 digit transaction id
        const transactionId = generateRandomTransactionId(randomTransactionIdLength);
        cartValue.transaction_id = transactionId;
        userValue.transaction_id = transactionId;
        // Handle file uploads, generate password, etc.
        const uploadedDocument = req.files.document;
        const uploadedImage = req.files.image;
        let documentPath = '';
        let imagePath = '';

        if (!uploadedDocument) {
            return next(createError(400, 'Document is required'));
        }
        if (uploadedDocument) {
            const documentFile = uploadedDocument[0];
            // fix the path of the documentFile remove the public from the path
            documentFile.destination = documentFile.destination.replace('public', '');
            documentPath = path.join(documentFile.destination, documentFile.filename);
            userValue.documents = documentPath;
        }

        if (!uploadedImage) {
            return next(createError(400, 'Image is required'));
        }


        if (uploadedImage) {
            const imageFile = uploadedImage[0];
            // fix the path of the imageFile remove the public from the path
            imageFile.destination = imageFile.destination.replace('public', '');
            imagePath = path.join(imageFile.destination, imageFile.filename);
            userValue.address_image = imagePath;
        }


        // Generate and send password
        const password = generateStrongPassword(6);

        // Generate QR code
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        console.log("cartValue")
        console.log(cartValue)

        const data1 = {
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                registeration: `New Registration ${new Date().toLocaleDateString()}`,
                // Assuming $addMember->id is already known
                company_name_eng: value.company_name_eng,
                mobile: value.mobile,
                address: {
                    zip: value.code,
                    countryName: value.country,
                    stateName: value.state,
                    cityName: value.city,
                },
                companyID: value.companyID,
                member_category: value.member_category,
                gtin_subscription: {
                    products: {
                        member_category_description: cartValue?.cart_items[0]?.productName,
                    },
                },
            },

            cart: cartValue,


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


        // get the second pdf file from public/gs1Docs/GS1_Saudi_Arabia_Data_Declaration.pdf and send it as attachment
        const pdfBuffer2 = await fs.readFile(path.join(__dirname, '..', 'public', 'gs1Docs', 'GS1_Saudi_Arabia_Data_Declaration.pdf'));


        // Define the directory and filename for the PDF
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
        const pdfFilename = `Invoice-${value?.company_name_eng}-${cartValue.transaction_id}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);
        cartValue.documents = `/uploads/documents/MemberRegInvoice/${pdfFilename}`
        // Ensure the directory exists
        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        // Generate PDF and save it to the specified path
        const filedata = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), data1, pdfFilePath);

        // now fetch the pdf file from the path and send it as attachment
        const invoiceBuffer = await fs.readFile(pdfFilePath);







        // Now you can use pdfFilePath to access or send the PDF file
        console.log(`PDF saved to: ${pdfFilePath}`);
        cartValue.cart_items = JSON.stringify(cartValue.cart_items);
        await sendOTPEmail(userValue.email, password, 'GS1 Login Credentials', "You can now use the services to 'Upload your Bank Slip'."

            , invoiceBuffer, pdfBuffer2);
        const hashedPassword = bcrypt.hashSync(password, 10);
        userValue.password = hashedPassword;
        userValue.industryTypes = JSON.stringify(userValue.industryTypes);

        // Start a transaction to ensure both user and cart are inserted
        const transaction = await prisma.$transaction(async (prisma) => {
            const newUser = await prisma.users.create({
                data: userValue
            });

            cartValue.user_id = newUser.id; // Assuming user ID is needed for the cart

            const newCart = await prisma.carts.create({
                data: cartValue
            });


            const cartData = JSON.parse(cartValue.cart_items)

            const gtinSubscriptionData = {
                transaction_id: transactionId,
                user_id: newUser.id,
                request_type: "registration",
                status: "inactive",
                price: parseFloat(cartData[0].price),
                pkg_id: cartData[0].productID,

            };


            const newGtinSubscription = await prisma.gtin_subcriptions.create({
                data: gtinSubscriptionData
            });






            const otherProductsData = cartData.slice(1).map(item => ({
                transaction_id: transactionId,
                user_id: newUser.id,
                status: "inactive",
                price: parseFloat(item.price),
                product_id: item.productID,
            }));
            const otherProductsSubscriptions = await Promise.all(
                otherProductsData.map(productData =>
                    prisma.other_products_subcriptions.create({ data: productData })
                )
            );

            // add all three documents to the member_documents table
            const documentsData = [
                {
                    type: "company_documents",
                    document: documentPath,
                    transaction_id: transactionId,
                    user_id: newUser.id,
                    doc_type: "member_document",
                    status: "pending"
                },
                {
                    type: "national_address",
                    document: imagePath,
                    transaction_id: transactionId,
                    user_id: newUser.id,
                    doc_type: "member_document",
                    status: "pending"
                },
                {
                    type: "invoice",
                    document: cartValue.documents,
                    transaction_id: transactionId,
                    user_id: newUser.id,
                    doc_type: "member_document",
                    status: "pending"
                }
            ];

            const memberDocuments = await Promise.all(
                documentsData.map(docData =>
                    prisma.member_documents.create({ data: docData })
                )
            );

            return { newUser, newCart, newGtinSubscription, otherProductsSubscriptions, memberDocuments };

            // return { newUser, newCart };

            // make trantion time to 40 sec
        }, { timeout: 40000 });

        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const memberLogin = async (req, res, next) => {
    try {
        // Validate user data (email, activity, password)
        const { email, activity, password } = req.body;

        // Query the database to find a user with the provided email and activity
        const user = await prisma.users.findFirst({
            where: { email: email, cr_activity: activity },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // If email, activity, and password are correct, generate a JWT token
        const token = jwt.sign({ userId: user.id }, MEMBER_JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        // Send the token in the response
        // res.status(200).json({ token });
        delete user.password;
        return res.cookie("memberToken", token, cookieOptions()).status(200).json({ success: true, memberData: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getUserDetails = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            user_type: Joi.string(),
            slug: Joi.string(),
            email: Joi.string().email(),
            fname: Joi.string(),
            lname: Joi.string(),
            // ... define validation for other allowed columns
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

        // Start a transaction to fetch users and their carts
        // if there is no filter conditions, fetch all users without carts
        if (!hasFilterConditions) {
            const users = await prisma.users.findMany({
                where: filterConditions
            });

            //sort the users by updated_at

            const sortedUsers = users.sort((a, b) => {
                return new Date(b.updated_at) - new Date(a.updated_at);
            });

           

            return res.json(sortedUsers);
        }
        const [users, allCarts] = await prisma.$transaction(async (prisma) => {
            // Fetch users based on filter conditions
            const users = await prisma.users.findMany({
                where: filterConditions,
            });

            // If no users are found, return early
            if (users.length === 0) {
                return [users, []];
            }

            // Fetch all carts for these users in one query
            const userIds = users.map(user => user.id);
            const allCarts = await prisma.carts.findMany({
                where: {
                    user_id: { in: userIds }
                }
            });

            return [users, allCarts];
        }, { timeout: 30000 });

        // Map carts to their respective users
        const usersWithCarts = users.map(user => ({
            ...user,
            carts: allCarts.filter(cart => cart.user_id == user.id)
        }));


        return res.json(usersWithCarts);
    } catch (error) {
        console.log(error);
        next(error);
    }
};




export const getUsersTempDetails = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            user_type: Joi.string(),
            slug: Joi.string(),
            email: Joi.string().email(),
            fname: Joi.string(),
            lname: Joi.string(),
            // ... define validation for other allowed columns
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

        const users = await prisma.users_temp.findMany({
            where: filterConditions
        });

        res.json(users);
    } catch (error) {
        next(error);
    }
};


// export const updateUser = async (req, res, next) => {
//     try {
//         const schema = Joi.object({
//             id: Joi.string().required(),
//         });
//         const { error: idError } = schema.validate(req.params);
//         if (idError) {
//             return next(createError(400, idError.details[0].message));
//         }

//         const { id } = req.params;
//         const { error } = userSchema.validate(req.body);
//         if (error) {
//             return res.status(400).json({ error: error.details[0].message });
//         }

//         const updatedUser = await prisma.users.update({
//             where: { id: id },
//             data: req.body,
//         });

//         // Check if the update was successful
//         if (!updatedUser) {
//             return next(createError(404, 'User not found'));
//         }

//         res.json(updatedUser);
//     } catch (error) {
//         next(error);
//     }
// };


export const getCrInfo = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    });

    const { error, value } = schema.validate(req.query);

    if (error) {
        // Validation failed, send a 400 Bad Request response
        return res.status(400).json({ error: error.details[0].message });
    }

    const { email } = value;
    try {
        // Query the database to find all users with the provided email
        const users = await prisma.users.findMany({
            where: { email: email },
            select: { cr_activity: true, cr_number: true },
        });

        if (users.length > 0) {
            // Users found, return their CR activity and CR number
            res.json(users.map(user => ({
                cr_activity: user.cr_activity,
                cr_number: user.cr_number
            })));
        } else {
            // Users not found, send a 404 Not Found response
            res.status(404).json({ error: 'Users not found' });
        }
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




export const updateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            userId: Joi.string().required(),
        });
        const { error: idError, value: idValue } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const userId = idValue.userId;

        // Validate user data
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        // Check if the user exists
        const existingUser = await prisma.users.findUnique({ where: { id: userId } });
        if (!existingUser) {
            return next(createError(404, 'User not found'));
        }

        // Handle file uploads and delete old files if new ones are uploaded
        if (req.files) {
            if (req.files.document) {
                const documentFile = req.files.document[0];
                const documentPath = path.join(documentFile.destination, documentFile.filename);

                // Delete the existing document
                if (existingUser.documents) {
                    const existingDocumentPath = path.join(__dirname, '..', existingUser.documents);
                    console.log("existingDocumentPath", existingDocumentPath);

                    if (fs1.existsSync(existingDocumentPath)) {
                        try {
                            await fs1.unlink(existingDocumentPath, (err) => {
                                if (err) {
                                    console.error('Error deleting old image:', err);
                                } else {
                                    console.log('Old image deleted successfully');
                                }
                            });
                        } catch (err) {
                            console.error('Error deleting old document:', err);
                            // Handle other errors if needed
                        }
                    } else {
                        console.log('Old document does not exist');
                    }
                }
                // Update the document path
                value.documents = documentPath;
            }
            if (req.files.image) {
                const imageFile = req.files.image[0];
                const imagePath = path.join(imageFile.destination, imageFile.filename);

                // Delete the existing image
                if (existingUser.address_image) {
                    const existingImagePath = path.join(__dirname, '..', existingUser.address_image);
                    console.log("existingImagePath", existingImagePath);

                    if (fs1.existsSync(existingImagePath)) {
                        try {
                            await fs1.unlink(existingImagePath, (err) => {
                                if (err) {
                                    console.error('Error deleting old image:', err);
                                } else {
                                    console.log('Old image deleted successfully');
                                }
                            });
                        } catch (err) {
                            console.error('Error deleting old image:', err);
                            // Handle other errors if needed
                        }
                    } else {
                        console.log('Old image does not exist');
                    }
                }
                // Update the image path
                value.address_image = imagePath;
            }
        }
        // Update user data in the database
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: value,
        });

        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const userStatusSchema = Joi.object({
    status: Joi.string().valid('active', 'inactive', 'reject', 'suspend').required(),
    userId: Joi.string().required(),
});


export const updateUserStatus = async (req, res, next) => {
    try {
        // Validate user data
        const { error, value } = userStatusSchema.validate(req.body);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { userId, status } = value;

        // Start a transaction
        const updatedUser = await prisma.$transaction(async (prisma) => {
            // Check if the user exists
            const existingUser = await prisma.users.findUnique({ where: { id: userId } });
            if (!existingUser) {
                throw createError(404, 'User not found');
            }

            let userUpdateResult;

            // If status is active, perform complex operations
            if (status === 'active') {
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
                        userUpdateResult = await prisma.users.update({
                            where: { id: userId },
                            data: {
                                gcpGLNID: gcpGLNID,
                                gln: gln,
                                gcp_expiry: expiryDate,
                                remarks: 'Registered',
                                payment_status: 1,
                                status: status
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
            } else {
                // Update status if not active
                userUpdateResult = await prisma.users.update({
                    where: { id: userId },
                    data: { status: status }
                });
            }


            return userUpdateResult;
        });

        // Send an email based on the updated status
        await sendStatusUpdateEmail(updatedUser.email, updatedUser.status);

        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        next(error);
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


// export const updateUserStatus = async (req, res, next) => {
//     try {

//         // Validate user data
//         const { error, value } = userStatusSchema.validate(req.body);
//         if (error) {
//             return next(createError(400, error.details[0].message));
//         }


//         const { userId, status } = value;


//         // Check if the user exists
//         const existingUser = await prisma.users.findUnique({ where: { id: userId } });
//         if (!existingUser) {
//             return next(createError(404, 'User not found'));
//         }

//         const updatedUser = await prisma.users.update({
//             where: { id: userId },
//             data: { status: status },
//         });

//         res.json(updatedUser);
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// };


export const deleteUser = async (req, res, next) => {
    try {
        // Validate the ID using Joi
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        // Attempt to delete the user
        const deletedUser = await prisma.users.delete({
            where: { id: id },
        });

        // Check if the deletion was successful
        if (!deletedUser) {
            return next(createError(404, 'User not found'));
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle the case where the user does not exist
        if (error.message.includes('Record to delete does not exist')) {
            return next(createError(404, 'User not found'));
        }
        next(error);
    }
};




// Carts Controllers Start

export const getCarts = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            transaction_id: Joi.string(),
            cart_items: Joi.string(),
            total: Joi.number(),
            documents: Joi.string(),
            request_type: Joi.string(),
            payment_type: Joi.string(),
            user_id: Joi.string(),

            // ... define validation for other allowed columns
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

        const carts = await prisma.carts.findMany({
            where: filterConditions
        });

        res.json(carts);
    } catch (error) {
        next(error);
    }
};



// export const updateCartReceipt = async (req, res, next) => {
//     // Validate body data
//     const schema = Joi.object({
//         transaction_id: Joi.string().required(),

//     });

//     const { error, value } = schema.validate(req.body);

//     if (error) {
//         return next(createError(400, error.details[0].message));
//     }

//     // Get uploaded receipt image
//     const uploadedImage = req.files.receipt;

//     if (!uploadedImage) {
//         return next(createError(400, 'Receipt image is required'));
//     }

//     const imageFile = uploadedImage[0];
//     const imageName = imageFile.filename;
//     imageFile.destination = imageFile.destination.replace('public', '');
//     const imagePath = path.join(imageFile.destination, imageName);
//     // remove the public from the path

//     // Find cart based on transaction ID
//     const cart = await prisma.carts.findFirst({
//         where: { transaction_id: value.transaction_id },
//     });

//     if (!cart) {
//         return next(createError(404, 'Cart not found'));
//     }

//     // Update cart with receipt information
//     const updatedCart = await prisma.carts.update({
//         where: { id: cart.id },
//         data: {
//             receipt: imageName,
//             receipt_path: imagePath,
//         },
//     });

//     res.status(200).json({
//         message: 'Receipt uploaded and cart updated successfully.',
//         updatedCart: updatedCart,
//     });
// };


export const updateCartReceipt = async (req, res, next) => {
    // Validate body data
    const schema = Joi.object({
        transaction_id: Joi.string().required(),
        user_id: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
        return next(createError(400, error.details[0].message));
    }

    // Get uploaded receipt image
    const uploadedImage = req.files.receipt;
    if (!uploadedImage) {
        return next(createError(400, 'Receipt image is required'));
    }

    const imageFile = uploadedImage[0];
    const imageName = imageFile.filename;
    imageFile.destination = imageFile.destination.replace('public', '');
    const imagePath = path.join(imageFile.destination, imageName);

    // Use Prisma's transaction method
    const [cart, user] = await prisma.$transaction([
        prisma.carts.findFirst({ where: { transaction_id: value.transaction_id } }),
        prisma.users.findUnique({ where: { id: value.user_id } })
    ]);

    if (!cart) {
        return next(createError(404, 'Cart not found'));
    }
    if (!user) {
        return next(createError(404, 'User not found'));
    }

    await prisma.carts.update({
        where: { id: cart.id },
        data: {
            receipt: imageName,
            receipt_path: imagePath,
        },
    });

    // Enhanced email template
    const emailTemplate = `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
            <h2 style="color: black;">Bank Slip Uploaded</h2>

            <p>The company <strong>${user.company_name_eng}</strong> has uploaded a bank slip for the transaction with ID: <strong>${value.transaction_id}</strong>.</p>
            <p>Please review the uploaded document at your earliest convenience.</p>
            <p>Gs1Ksa</p>
            <img src="${BACKEND_URL}/gs1Images/backend/logo/service_default_image.jpeg" alt="GS1 Logo" style="width: 150px; height: auto;"/>
        </div>
    `;

    await sendEmail({
        toEmail: ADMIN_EMAIL, // Replace with the admin's email address
        subject: 'New Bank Slip Uploaded',
        htmlContent: emailTemplate,
    });

    res.status(200).json({
        message: 'Receipt uploaded and cart updated successfully.',
        updatedCart: cart,
    });
};