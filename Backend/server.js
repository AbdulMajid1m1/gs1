import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rootRoute from "./routes/RootRoute.js";
import { handleInvoiceReminders } from './utils/functions/reminderEmailFun.js';
import QRCode from 'qrcode';
// import { PrismaClient } from '@prisma/client';
import ejs from 'ejs';
import { BACKEND_URL } from "./configs/envConfig.js";
import cron from 'node-cron';
import { createServer } from "http";
// Other imports remain the same

import socketHandler from "./socketHandler.js"; // Import the socket handler

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();



dotenv.config();

const allowedOrigins = [
    "http://localhost:3092",
    "http://gs1ksa.org:3092"


];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));






app.use(express.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set('view engine', 'ejs');

// pass public directory path in ejs
app.set('views', path.join(__dirname, 'views'));



// calling the routes
app.use("/api", rootRoute);

app.get('/renderInvoice', async (req, res) => {
    // Define your dummy data here
    const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
    const data = {
        type: "downgrade",
        memberData: {
            // add New Rigistriont with current date
            registeration: `New Registration ${new Date().toLocaleDateString()}`,
            qrCodeDataURL: qrCodeDataURL,
            yearsToPay: 2,
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
                {

                    productName: 'Product Name',
                    registration_fee: 100,
                    yearly_fee: 100,
                },
                {

                    productName: 'Product Name',
                    registration_fee: 100,
                    yearly_fee: 100,
                }
            ],
        },
        currentDate: {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1, // getMonth() returns 0-11
            year: new Date().getFullYear(),
        },
        custom_amount: 100, // Example custom amount

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
    res.render('pdf/oldMembersCustomInvoice', { data });
});

// Define your API route to render the certificate
app.get('/renderCertificate', async (req, res) => {
    const BACKEND_URL = 'http://localhost:3000'; // Adjust this URL as needed
    const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
    // Define your data object with missing or dynamic data
    const data = {
        qrCodeDataURL: qrCodeDataURL,
        user: {
            company_name_eng: 'Company Name', // Dummy data, replace with actual user data from your API
        },
        general: {
            gcp_certificate_detail1: ['Global Trade Item Number(GTIN)', 'Certificate Detail 1'], // Dummy data, replace with actual detail data from your API
            gcp_certificate_detail2: ['Certificate Detail 2', 'Global Trade Item Number(GTIN)'], // Dummy data, replace with actual detail data from your API
            gcp_legal_detail: 'Legal Detail', // Dummy data, replace with actual legal detail from your API
        },
        userData: {
            gcpGLNID: 'GCP GLN ID', // Dummy data, replace with actual user data from your API
            gln: 'GLN', // Dummy data, replace with actual user data from your API
            companyID: 'Company ID', // Dummy data, replace with actual user data from your API
            gcp_expiry: '2023-12-31', // Dummy data, replace with actual user data from your API
        },
        uploadPath: '/your/upload/path/', // Dummy data, replace with actual upload path
        backendImagePath: '/your/backend/image/path/', // Dummy data, replace with actual backend image path
        expiryDate: '31-12-2025', // Dummy data, replace with actual user data from your API
        explodeGPCCode: [1, 2]
    };

    // Render the EJS template with the data
    res.render('pdf/certificate_Ar', { data });
});


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // return res.status(errorStatus).send(errorMessage);
    return res.status(errorStatus).json({ error: errorMessage });
});



// Setting up a cron job to run every hour
cron.schedule('0 * * * *', () => {
    console.log('Running a task every hour');
    handleInvoiceReminders();
});

app.get('/test', async (req, res) => {
    handleInvoiceReminders();
    res.send('test');
});
//-------------------arabic---------------------------------------
import { promisify } from 'util';
import fs from 'fs';
import Joi from 'joi';
import prisma from './prismaClient.js';
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const languageSchema = Joi.object({
    type: Joi.string().max(255),
    key: Joi.string().max(255).required(),
    value: Joi.string().required(),
    

});
const jsonFilePath = './arabic.json';

app.get('/translations', async (req, res, next) => {
   try {
       const AllUNSPSC = await prisma.languages.findMany();

       // Create an empty object to store the formatted data
       let formattedData = {};

       // Loop through the data and populate the formatted object
       AllUNSPSC.forEach(item => {
           formattedData[item.key] = item.value;
       });

       res.json(formattedData);
   } catch (error) {
       next(error);
   }
});
app.get('/translations_table', async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.languages.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
});
app.put('/translations/:LanguageID', async (req, res, next) => {
    try {
        const languageSchema = Joi.object({
            value: Joi.string().required(),
        });

        const schema = Joi.object({
            LanguageID: Joi.number().required(),
        });

        const {
            error: idError
        } = schema.validate(req.params);
        if (idError) {
            throw createError(400, idError.details[0].message);
        }

        const {
            LanguageID
        } = req.params;

        const {
            error: validationError
        } = languageSchema.validate(req.body);
        if (validationError) {
            throw createError(400, validationError.details[0].message);
        }

        const {
            value
        } = req.body;
        const updatedTranslation = await prisma.languages.update({
            where: {
                LanguageID: parseInt(LanguageID), // Assuming "key" is the correct field to identify the record
            },
            data: {
                value: value,
            },
        });

        res.json(updatedTranslation);
    } catch (error) {
        next(error);
    }
});

app.get('/convert', async (req, res, next) => {
    try {
        // Read the JSON file
        fs.readFile(jsonFilePath, 'utf8', async (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return res.status(500).send('Error reading file');
            }

            try {
                // Parse JSON data to JavaScript object
                const languageObject = JSON.parse(data);

                // Convert object to array of key-value pairs
                const languages = Object.entries(languageObject);

                for (const [key, value] of languages) {
                    await prisma.languages.create({
                        data: {
                            key,
                            value,
                        },
                    });
                    console.log(`Created language with key: ${key}`);
                }
                res.status(200).send('Languages inserted successfully');
            } catch (error) {
                console.error('Error parsing JSON:', error);
                res.status(500).send('Error parsing JSON');
            } finally {
                await prisma.$disconnect();
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/translations', async (req, res, next) => {
    try {
        const {
            error,
            value
        } = languageSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const unit = await prisma.languages.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
});


// Create an HTTP server from the Express app
const httpServer = createServer(app);

// Pass the server to the socketHandler
socketHandler(httpServer);
const PORT = process.env.PORT || 3091;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


