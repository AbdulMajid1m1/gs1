import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { generateStrongPassword } from '../utils/functions/commonFunction.js';
import { sendOTPEmail } from '../services/emailTemplates.js';
import bcrypt from 'bcryptjs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';
import fs from 'fs/promises';
import ejs from 'ejs';
import pdf from 'html-pdf';
import fsSync from 'fs';
import { BACKEND_URL } from '../configs/envConfig.js';
import { generateRandomTransactionId } from '../utils/utils.js';

// Define the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const userSchema = Joi.object({
    user_type: Joi.string().max(20),
    slug: Joi.string(),
    location_uk: Joi.string(),
    have_cr: Joi.string(),
    cr_documentID: Joi.number().integer(),
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
    membership_type: Joi.string(),
    member_category: Joi.string().max(50),
    other_products: Joi.string(),
    gpc: Joi.string(),
    product_addons: Joi.string(),
    total: Joi.number(),
    contactPerson: Joi.string(),
    companyLandLine: Joi.string(),
    documents: Joi.string(),
    address_image: Joi.string(),
    payment_type: Joi.string(),
    online_payment: Joi.string(),
    remember_token: Joi.string(),
    parent_memberID: Joi.number().integer(),
    member_type: Joi.string().max(50),
    invoice_file: Joi.string(),
    otp_status: Joi.number().integer(),
    gcpGLNID: Joi.string().max(50),
    gln: Joi.string().max(50),
    gcp_type: Joi.string().max(50),
    deleted_at: Joi.date(),
    gcp_expiry: Joi.date(),
    memberID: Joi.string(),
    user_id: Joi.string(),
    remarks: Joi.string(),
    assign_to: Joi.number().integer(),
    membership_category: Joi.string().max(50),
    upgradation_disc: Joi.number().integer(),
    upgradation_disc_amount: Joi.number(),
    renewal_disc: Joi.number().integer(),
    renewal_disc_amount: Joi.number(),
    membership_otherCategory: Joi.string().max(50),
    activityID: Joi.number().integer(),
    registration_type: Joi.string().max(10),

    // Nested cart schema
    cart: Joi.object({
        transaction_id: Joi.string(),
        cart_items: Joi.array().items(Joi.object({
            productID: Joi.string(),
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
        payment_status: Joi.string(),
        user_id: Joi.string(),
        status: Joi.string(),
        created_at: Joi.date(),
        updated_at: Joi.date(),
        deleted_at: Joi.date().allow(null),
        reject_reason: Joi.string().allow(null),
        reject_by: Joi.number().integer().allow(null),
        receipt: Joi.string(),
        receipt_path: Joi.string(),
        admin_id: Joi.number().integer(),
        assign_to: Joi.number().integer().allow(null),
        discount: Joi.number().allow(null)
    })
});

// Define a function to generate a PDF from EJS template

const generatePDF = async (ejsFilePath, data) => {
    const ejsTemplate = await fs.readFile(ejsFilePath, 'utf-8');
    const htmlContent = await ejs.render(ejsTemplate, { data });

    return new Promise((resolve, reject) => {
        pdf.create(htmlContent, { format: 'A4' }).toBuffer((err, buffer) => {
            if (err) return reject(err);
            resolve(buffer);
        });
    });
};


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
        cartValue.transaction_id = generateRandomTransactionId(randomTransactionIdLength);

        // Handle file uploads, generate password, etc.
        const uploadedDocument = req.files.document;
        const uploadedImage = req.files.image;
        let documentPath = '';
        let imagePath = '';

        if (uploadedDocument) {
            const documentFile = uploadedDocument[0];
            documentPath = path.join(documentFile.destination, documentFile.filename);
            userValue.documents = documentPath;
        }

        if (uploadedImage) {
            const imageFile = uploadedImage[0];
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

            // cart: {
            //     request_type: 'New Registration', // Can be 'registration', 'renew', or 'addon
            //     transaction_id: randTransactionId,
            //     payment_type: value.payment_type, // Can be 'bank_transfer' or 'Mada/Visa'
            //     cart_items: [
            //         {

            //         }
            //         'Item 2 Description',
            //         'Item 3 Description',
            //     ],
            // },
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

        // Generate PDF from EJS template
        const pdfBuffer = await generatePDF(path.join(__dirname, '..', 'views', 'pdf', 'customInvoice.ejs'), data1);

        // Define the directory and filename for the PDF
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
        const pdfFilename = `Invoice-${value?.company_name_eng}-${cartValue.transaction_id}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);
        cartValue.documents = `/uploads/documents/MemberRegInvoice/${pdfFilename}`
        // Ensure the directory exists
        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        // Save the PDF file
        await fs.writeFile(pdfFilePath, pdfBuffer);

        // Now you can use pdfFilePath to access or send the PDF file
        console.log(`PDF saved to: ${pdfFilePath}`);
        cartValue.cart_items = JSON.stringify(cartValue.cart_items);
        await sendOTPEmail(userValue.email, password, 'Login Credentials', null, pdfBuffer);
        const hashedPassword = bcrypt.hashSync(password, 10);
        userValue.password = hashedPassword;

        // Start a transaction to ensure both user and cart are inserted
        const transaction = await prisma.$transaction(async (prisma) => {
            const newUser = await prisma.users.create({
                data: userValue
            });

            cartValue.user_id = newUser.id; // Assuming user ID is needed for the cart

            const newCart = await prisma.carts.create({
                data: cartValue
            });

            return { newUser, newCart };
        });

        res.status(201).json(transaction);
    } catch (error) {
        console.log(error);
        next(error);
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

        const users = await prisma.users.findMany({
            where: filterConditions
        });

        res.json(users);
    } catch (error) {
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


export const updateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedUser = await prisma.users.update({
            where: { id: id },
            data: req.body,
        });

        // Check if the update was successful
        if (!updatedUser) {
            return next(createError(404, 'User not found'));
        }

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};


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
