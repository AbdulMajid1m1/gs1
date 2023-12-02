import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import rootRoute from "./routes/RootRoute.js";
// import { PrismaClient } from '@prisma/client';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config();

const allowedOrigins = [
    "http://localhost:3000"

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

app.get('/render', (req, res) => {
    // Define your dummy data here
    const data = {
        memberData: {
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
    };

    // Render the EJS template with the dummy data
    res.render('pdf/customInvoice', { data });
});

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // return res.status(errorStatus).send(errorMessage);
    return res.status(errorStatus).json({ error: errorMessage });
});



const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





// app.get("/users", async (req, res) => {
//     const users = await prisma.users.findMany();
//     function customJSONStringify(obj) {
//         return JSON.stringify(obj, (key, value) =>
//             typeof value === 'bigint' ? value.toString() : value
//         );
//     }
//     // const test = await pri

//     // Usage
//     res.send(customJSONStringify(users));
// }
// );