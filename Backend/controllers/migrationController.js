import { oldGs1Prisma } from '../prismaMultiClinets.js';
import prisma from '../prismaClient.js';
import { createError } from '../utils/createError.js';
import Joi from 'joi';
import { convertEjsToPdf, generateStrongPassword } from '../utils/functions/commonFunction.js';
import { generateRandomTransactionId } from '../utils/utils.js';
import { ADMIN_EMAIL, BACKEND_URL } from '../configs/envConfig.js';
import path from 'path';
import fs from 'fs/promises';
import fs1 from 'fs';
import QRCode from 'qrcode';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import fsSync from 'fs';
import { createMemberLogs } from '../utils/functions/historyLogs.js';
import { sendEmail } from '../services/emailTemplates.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const searchMembers = async (req, res, next) => {
    try {
        // Define the validation schema
        const schema = Joi.object({
            keyword: Joi.string().required(),
        });

        // Validate the keyword
        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { keyword } = value;

        const searchableColumns = [
            'MemberNameE',
            'MemberNameA',
            'Email',
            'GLN',
            'IntID'
            // Add other searchable columns as needed
        ];

        const searchConditions = {
            OR: searchableColumns.map(column => ({
                [column]: {
                    startsWith: keyword.toLowerCase(), // Use startsWith operator
                },
            })),
        };

        // Fetch the top 30 latest records that match the search conditions
        const members = await oldGs1Prisma.Member.findMany({
            where: searchConditions,
            orderBy: { CreatedDate: 'desc' }, // Sort by CreatedDate in descending order
            take: 30, // Limit to 30 records
        });

        return res.json(members);
    } catch (error) {
        console.error(error);
        next(error);
    }
};



export const getMembershipHistory = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            MembershipID: Joi.number(),
            MemberID: Joi.number().required(),
            MembershipYear: Joi.number(),
            MembershipTypeID: Joi.number(),
            // ... define validation for other allowed columns
        };

        // Create a dynamic schema based on the allowed columns
        const filterSchema = Joi.object(
            Object.keys(allowedColumns).reduce((schema, column) => {
                schema[column] = allowedColumns[column];
                return schema;
            }, {})
        ).unknown(false);



        // Validate the request query
        const { error, value } = filterSchema.validate(req.query);
        if (error) {
            return next(createError(400, `Invalid query parameter: ${error.details[0].message}`));
        }
        // get the member id from the query
        const { MemberID } = value;
        const latestMembership = await oldGs1Prisma.membershipHistory.findFirst({
            where: {
                MemberID: MemberID,
                Status: 'active',
            },
            orderBy: {
                MembershipYear: 'desc',
            },
        });
        if (!latestMembership) {
            return res.status(404).json({ message: 'No active membership history found for this member.' });
        }

        // Calculate the number of years the user has to pay
        const currentYear = new Date().getFullYear();
        const yearsToPay = currentYear - latestMembership.MembershipYear;




        const member = await oldGs1Prisma.Member.findUnique({
            where: { MemberID: MemberID },
            include: { MembershipType: true },
        });
        if (!member) {
            return res.status(404).json({ message: 'Member not found.' });
        }

        // Fetch pricing information
        const membershipType = member.MembershipType;

        // Map old member data to new user schema
        // Map MembershipNameE to product categories and pricing
        const productPricing = await prisma.gtin_products.findMany({
            where: {
                member_category_description: mapMembershipTypeToCategory(membershipType.MembershipNameE),
            },
        });


        if (productPricing.length == 0) {
            throw createError(400, "No product pricing found for this member.");
        }

        let yearly_fee;
        if (membershipType.MembershipNameE === "Medical Category") {
            yearly_fee = productPricing?.[0]?.med_yearly_subscription_fee;
        } else {
            yearly_fee = productPricing?.[0]?.gtin_yearly_subscription_fee;
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

        // Fetch membership history based on filter conditions
        const membershipHistory = await oldGs1Prisma.membershipHistory.findMany({
            where: filterConditions,
        });

        membershipHistory.sort((a, b) => b.MembershipYear - a.MembershipYear);


        // Construct response
        const response = {
            MemberID: MemberID,
            YearsToPay: yearsToPay,
            yearlyAmount: yearly_fee,
            MembershipHistory: membershipHistory,
        };


        return res.json(response);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


export const migrateUser = async (req, res, next) => {
    try {
        // Validate the MemberID in the request body
        const schema = Joi.object({
            MemberID: Joi.number().required(),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return next(createError(400, error.details[0].message));
        }
        const { MemberID } = value;

        // Fetch the latest active membership history record
        const latestMembership = await oldGs1Prisma.membershipHistory.findFirst({
            where: {
                MemberID: MemberID,
                Status: 'active',
            },
            orderBy: {
                MembershipYear: 'desc',
            },
        });
        if (!latestMembership) {
            return res.status(404).json({ message: 'No active membership history found for this member.' });
        }

        // Calculate the number of years the user has to pay
        const currentYear = new Date().getFullYear();
        const yearsToPay = currentYear - latestMembership.MembershipYear;
        // show current year in the invoice
        let TypeOfPaymentText = `Renewal up to year ${currentYear}`;


        const member = await oldGs1Prisma.Member.findUnique({
            where: { MemberID: MemberID },
            include: { MembershipType: true },
        });
        if (!member) {
            return res.status(404).json({ message: 'Member not found.' });
        }
        const products = JSON.parse(member.Products || '[]');

        // Fetch pricing information
        const membershipType = member.MembershipType;

        // Map old member data to new user schema
        const newUser = mapMemberToNewUser(member); // Implement this mapping function to map old member data to new user schema
        // Map MembershipNameE to product categories and pricing
        const productPricing = await prisma.gtin_products.findMany({
            where: {
                member_category_description: mapMembershipTypeToCategory(membershipType.MembershipNameE),
            },
        });


        if (productPricing.length == 0) {
            throw createError(400, "No product pricing found for this member.");
        }


        // Construct response
        const response = {
            MemberID: MemberID,
            YearsToPay: yearsToPay,
            Products: products,
            ProductPricing: productPricing,
        };

        let cart_items = [];


        let registration_fee = 0;
        let yearly_fee;
        if (membershipType.MembershipNameE === "Medical Category") {
            yearly_fee = productPricing?.[0]?.med_yearly_subscription_fee;
        } else {
            yearly_fee = productPricing?.[0]?.gtin_yearly_subscription_fee;
        }


        cart_items.push({
            "productID": productPricing?.[0]?.id,
            "productName": productPricing?.[0]?.member_category_description,
            "registration_fee": registration_fee.toString(), // Convert to string
            "yearly_fee": yearsToPay === 0 ? 0 : yearly_fee.toString(),
            "price": (Number(registration_fee) + Number(yearly_fee)).toString(),
            "product_type": productPricing?.[0]?.type,
        })

        // Determine which products the user is subscribed to
        const isSubscribedToGLN = products.some(product => product.Product === "GLN");
        const isSubscribedToSSCC = products.some(product => product.Product === "SSCC");

        // Fetch additional product data based on subscription
        let otherProductData = [];

        const productNames = [];
        if (isSubscribedToGLN) {
            productNames.push("GLN (30 Locations)");
        }
        if (isSubscribedToSSCC) {
            productNames.push("SSCC");
        }

        if (productNames.length > 0) {
            otherProductData = await prisma.other_products.findMany({
                where: {
                    product_name: {
                        in: productNames
                    }
                }
            });
        }

        let otherProductsYearlyFee = membershipType.MembershipNameE === "Medical Category" ? 0 : 0;

        // Construct cart items for GLN and/or SSCC
        const cartItems = otherProductData.map(product => {
            return {
                productID: product.id,
                productName: product.product_name,
                registration_fee: 0,
                yearly_fee: yearsToPay > 0 ? membershipType.MembershipNameE === "Medical Category" ? product.med_subscription_fee : product.product_subscription_fee.toString() : 0,
                price: membershipType.MembershipNameE === "Medical Category" ? product.med_subscription_fee : product.product_subscription_fee.toString(),
                product_type: 'other_products',
            };
        });

        // Add GLN and/or SSCC cart items to the cart
        cart_items = [...cart_items, ...cartItems];
        console.log("cart_items", cart_items);

        // Generate a unique transaction ID
        const transactionId = generateRandomTransactionId(10);
        newUser.transaction_id = transactionId;




        // Insert new user data into the new database
        const createdUser = await prisma.users.create({
            data: newUser,
        });

        // Construct response
        response.User = createdUser;
        // Construct cart data
        const cart = {
            transaction_id: transactionId,
            cart_items: JSON.stringify(cart_items),
            user_id: createdUser.id,
        };

        // Insert cart data into the new database
        const createdCart = await prisma.carts.create({
            data: cart,
        });

        // Construct response
        response.Cart = createdCart;

        let parsedCartItems = JSON.parse(createdCart.cart_items);
        const gtinSubscriptionData = {
            transaction_id: transactionId,
            user_id: createdUser.id,
            request_type: "registration",
            status: "inactive",
            price: parseFloat(parsedCartItems[0].registration_fee),
            pkg_id: parsedCartItems[0].productID,
            gtin_subscription_total_price: parseFloat(parsedCartItems[0].yearly_fee),

        };

        const newGtinSubscription = await prisma.gtin_subcriptions.create({
            data: gtinSubscriptionData
        });

        // Construct response
        response.GtinSubscription = newGtinSubscription;

        const otherProductsData = parsedCartItems.slice(1).map(item => ({
            transaction_id: transactionId,
            user_id: createdUser.id,
            status: "inactive",
            price: parseFloat(item.registration_fee),

            product_id: item.productID,
            product_identifier_name: item.productName,
            other_products_subscription_total_price: parseFloat(item.yearly_fee),
        }));

        const otherProductsSubscriptions = await Promise.all(
            otherProductsData.map(productData =>
                prisma.other_products_subcriptions.create({ data: productData })
            )
        );

        // Construct response
        response.OtherProductsSubscriptions = otherProductsSubscriptions;

        // Construct invoice data

        // Generate QR code
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        // parse cart items to get the product name
        cart.cart_items = JSON.parse(cart.cart_items);
        const data1 = {
            topHeading: "INVOICE",
            secondHeading: "BILL TO",
            memberData: {
                qrCodeDataURL: qrCodeDataURL,
                // registeration: `New Registration for the year ${new Date().getFullYear()}`,
                registeration: TypeOfPaymentText,
                yearsToPay: yearsToPay,
                // Assuming $addMember->id is already known
                company_name_eng: createdUser.company_name_eng,
                mobile: createdUser.mobile,
                address: {
                    zip: createdUser.zip_code,
                    countryName: createdUser.country,
                    stateName: createdUser.state,
                    cityName: createdUser.city,
                },
                companyID: createdUser.companyID,
                membership_otherCategory: createdUser.membership_category,
                gtin_subscription: {
                    products: {
                        member_category_description: parsedCartItems?.[0]?.productName,
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


        // get the second pdf file from public/gs1Docs/GS1_Saudi_Arabia_Data_Declaration.pdf and send it as attachment
        const pdfBuffer2 = await fs.readFile(path.join(__dirname, '..', 'public', 'gs1Docs', 'GS1_Saudi_Arabia_Data_Declaration.pdf'));


        // Define the directory and filename for the PDF
        const pdfDirectory = path.join(__dirname, '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
        const pdfFilename = `Invoice-${createdUser?.company_name_eng}-${transactionId}-${new Date().toLocaleString().replace(/[/\\?%*:|"<>]/g, '-')}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);
        // Ensure the directory exists
        if (!fsSync.existsSync(pdfDirectory)) {
            fsSync.mkdirSync(pdfDirectory, { recursive: true });
        }

        // Generate PDF and save it to the specified path
        const filedata = await convertEjsToPdf(path.join(__dirname, '..', 'views', 'pdf', 'oldMembersCustomInvoice.ejs'), data1, pdfFilePath);

        // now fetch the pdf file from the path and send it as attachment
        const invoiceBuffer = await fs.readFile(pdfFilePath);
        const documentsData =
        {
            type: "migration_invoice",
            document: `/uploads/documents/MemberRegInvoice/${pdfFilename}`,
            transaction_id: transactionId,
            user_id: createdUser.id,
            doc_type: "member_document",
            status: "pending",
            uploaded_by: createdUser.email,
            no_of_years: yearsToPay,
        }



        let invoiceRecord = await prisma.member_documents.create({ data: documentsData })

        // Construct response
        response.invoiceRecord = invoiceRecord;


        //send email to user
        const mailOptions = {
            subject: 'GS1 Saudi Arabia Invoice',
            html: ` <p>Thank you for your interest in GS1 Saudi Arabia.</p>
            <p>Please find attached invoice for your GS1 Saudi Arabia membership.</p>
            <p>Kindly note that your membership will be activated upon receipt of payment.</p>
            <p>For any queries, please contact us on 920000927 or email us on
            <a href="mailto:
            ${ADMIN_EMAIL}">${ADMIN_EMAIL}</a></p>
            <p>Best regards,</p>
            <p>GS1 Saudi Arabia</p>`,
            attachments: [
                {
                    filename: pdfFilename,
                    content: invoiceBuffer,
                    contentType: 'application/pdf',
                },
                {
                    filename: 'GS1_Saudi_Arabia_Data_Declaration.pdf',
                    content: pdfBuffer2,
                    contentType: 'application/pdf',
                },
            ],

        };

        // Send email
        await sendEmail(
            {
                fromEmail: ADMIN_EMAIL,
                // toEmail: createdUser.email,
                toEmail: 'abdulmajid1m2@gmail.com',
                subject: mailOptions.subject,
                htmlContent: mailOptions.html,
                attachments: mailOptions.attachments,

            }
        );

        const logData = {
            subject: 'Member Registration',

            user_id: createdUser.id,
            // TODO: take email form current admin token
            // admin_id: 'admin@gs1sa.link',

        }



        try {
            await createMemberLogs(logData);
        }
        catch (error) {
            console.log("error in member logs")
            console.log(error)

        }



        return res.json(response);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Helper function to map MembershipNameE to product categories
function mapMembershipTypeToCategory(membershipName) {
    switch (membershipName) {
        case "Category B : 1 - 1,000 products":
            return "Category C ( 1,000 Barcodes )";
        case "Category A+ : up to 1,000,000 products":
            return "Category F (100,000 Barcodes )";
        case "Category A : up to 100,000 products":
            return "Category F (100,000 Barcodes )";
        case "Medical Category":
            return "Category F (100,000 Barcodes )";
        default:
            return null;
    }
}






function mapMemberToNewUser(member) {
    let newUser = {
        // Direct mappings from Member to users
        // email: member.Email || '', 
        // TODO: uncomment the above line and remove the below line
        email: 'abdulmajid1m1@gmail.com',
        fname: member.MemberNameE || '',
        lname: member.MemberNameA || '',
        mobile: member.Phone1 || '',
        company_name_eng: member.MemberNameE || '',
        company_name_arabic: member.MemberNameA || '',
        website: member.Website || '',
        po_box: member.POBox || '',
        companyLandLine: member.Phone2 || '',
        no_of_staff: member.Staff ? member.Staff.toString() : '',
        gcpGLNID: member.GLNID ? member.GLNID.toString() : '',
        gln: member.GLN || '',
        memberID: member.MemberID ? member.MemberID.toString().replace(/\s/g, '') : '',
        companyID: member.IntID ? member.IntID.toString() : '',
        user_id: member.UserID ? member.UserID.toString() : '',

        // Default or logic-based values for other fields
        user_type: '',
        slug: '',
        location_uk: '',
        have_cr: '',
        cr_documentID: '',
        document_number: '',
        fname: '',
        lname: '',
        image: '',
        mbl_extension: '',
        additional_number: '',
        other_landline: '',
        unit_number: '',
        qr_corde: '',
        email_verified_at: null,
        password: generateStrongPassword(6), // Generate a random string
        verification_code: null,
        cr_number: '',
        cr_activity: '',
        bussiness_activity: '',
        member_category: '',
        other_products: '',
        gpc: '',
        product_addons: '',
        total: null,
        documents: '',
        address_image: '',
        status: 'inactive', // Default value or based on Member status
        payment_type: '',
        payment_status: 0, // Default value
        online_payment: '',
        remember_token: '',
        parent_memberID: '0', // Default value
        invoice_file: '',
        otp_status: null,
        transaction_id: '',
        deleted_at: null,
        gcp_expiry: null,
        member_type: 'old',
        remarks: 'Pending Invoice', // Default value
        assign_to: 0, // Default value
        membership_category: '',
        upgradation_disc: 0, // Default value
        upgradation_disc_amount: 0.0, // Default value
        renewal_disc: 0, // Default value
        renewal_disc_amount: 0.0, // Default value
        membership_otherCategory: '',
        activityID: 0, // Default value
        registration_type: '',
        city: '',
        country: '',
        state: '',
        zip_code: '',
        old_member_recheck: 0, // Default value
        is_login: 0, // Default value
        membership_category_id: '',
        industryTypes: '',
        isproductApproved: 1, // Default value
        pending_invoices: 'pending_for_approval', // Default value
    };

    return newUser;
}
