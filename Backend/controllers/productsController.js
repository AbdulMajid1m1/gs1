import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import XLSX from 'xlsx';
import path from 'path';
import fs1 from 'fs/promises';
import fs from 'fs';
import ejs from 'ejs';
import QRCode from 'qrcode';
import { generateProdcutGTIN, isValidGCPInBarcode } from '../utils/functions/barcodesGenerator.js';
import { ADMIN_EMAIL } from '../configs/envConfig.js';
import { sendEmail } from '../services/emailTemplates.js';
import { createAdminLogs, createMemberLogs } from '../utils/functions/historyLogs.js';
import { gs1dlPrisma } from '../prismaMultiClinets.js';


function checkExpiryDate(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (today > expiry) {
        throw createError(403, 'Subscription expired, please renew your subscription');
    }
}




const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const getProducts = async (req, res, next) => {
    try {
        // Define allowable columns for filtering (for products)
        const allowedColumns = {
            id: Joi.string(),
            user_id: Joi.string(),
            gcpGLNID: Joi.string(),
            memberID: Joi.string(),
            barcode: Joi.string(),

        };

        // Create a dynamic schema based on the allowed columns for products
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

        // Construct filter conditions for Prisma query
        const filterConditions = { ...value };

        // Fetch products based on filter conditions
        const products = await prisma.products.findMany({
            where: filterConditions,
            orderBy: { updated_at: 'desc' } // Sort by updated_at in descending order
        });

        return res.json(products);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const searchMemberGtin = async (req, res, next) => {
    const { gtin } = req.body;

    try {
        const products = await prisma.products.findFirst({
            where: {
                barcode: {
                    contains: gtin,
                },
                deleted_at: null,
            },
        });

        if (products) {
            const member = await prisma.users.findFirst({
                where: {
                    id: products.user_id,
                },
            });

            // You can fetch productContents and other data here as needed
            const productContents = await gs1dlPrisma.tblProductContents.findMany({
                where: {
                    GTIN: gtin,
                },
            });

            // Define your response object with properties
            const responseObj = {
                status: 200,
                gtinArr: {
                    gtin: products.barcode,
                    companyName: member.company_name_eng,
                    licenceKey: member.gcpGLNID,
                    website: member.website,
                    address: member.address,
                    licenceType: 'GS1 Saudi Arabia', // Modify as needed
                    gpcCategoryCode: products.gpc_code,
                    brandName: products.BrandName,
                    productDescription: products.details_page,
                    productImageUrl: 'https://example.com/image.jpg', // Replace with actual image URL
                    unitCode: products.unit,
                    unitValue: products.size,
                    countryOfSaleCode: products.countrySale,
                    productName: products.productnameenglish,
                    gcpGLNID: member.gcpGLNID,
                    status: products.status === 1 ? 'Active' : 'InActive',
                    // Add more properties here
                },
                productContents: productContents, // Add productContents data here
            };

            return res.status(200).json(responseObj);
        } else {
            return res.status(404).json({ status: 404, message: 'Data not found!' });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }

};




// Joi schema for product validation
const productSchema = Joi.object({
    user_id: Joi.string().required(),
    import_code: Joi.string().max(50).allow('', null),
    productnameenglish: Joi.string().allow('', null),
    productnamearabic: Joi.string().required(),
    BrandName: Joi.string().max(255).allow('', null),
    ProductType: Joi.string().max(50).allow('', null),
    Origin: Joi.string().max(50).allow('', null),
    PackagingType: Joi.string().max(50).allow('', null),
    MnfCode: Joi.string().max(50).allow('', null),
    MnfGLN: Joi.string().max(50).allow('', null),
    ProvGLN: Joi.string().max(50).allow('', null),
    unit: Joi.string().max(50).allow('', null),
    size: Joi.string().max(50).allow('', null),
    childProduct: Joi.string().max(255).allow('', null),
    quantity: Joi.string().max(10).allow('', null),
    gpc: Joi.string().max(255).allow('', null),
    gpc_code: Joi.alternatives().try(Joi.string().max(50).allow('', null), Joi.number().allow('', null)),
    countrySale: Joi.string().max(50).allow('', null),
    HSCODES: Joi.string().allow('', null),
    HsDescription: Joi.string().allow('', null),
    gcp_type: Joi.string().max(50).allow('', null),
    prod_lang: Joi.string().max(50).required(),
    details_page: Joi.string().allow('', null),
    details_page_ar: Joi.string().allow('', null),
    status: Joi.number().integer(),
    memberID: Joi.string().allow('', null),
    admin_id: Joi.number().integer().allow('', null),
    save_as: Joi.string().max(20).allow('', null),
    gtin_type: Joi.string().max(4).allow('', null),
    product_url: Joi.string().max(255).allow('', null),
    product_link_url: Joi.string().max(255).allow('', null),
    BrandNameAr: Joi.string().allow('', null),
    digitalInfoType: Joi.number().integer().allow('', null),
    readyForGepir: Joi.string().max(10).allow('', null),
    gepirPosted: Joi.string().max(10).allow('', null),
});


export const createProduct = async (req, res, next) => {


    // Validate request body
    const { error, value } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }



    const getImagePath = (image) => {
        if (!image || image.length === 0) return null;
        const imageFile = image[0];
        imageFile.destination = imageFile.destination.replace('public', '');
        return path.join(imageFile.destination, imageFile.filename);
    };

    const images = {
        front_image: getImagePath(req.files.front_image),
        back_image: getImagePath(req.files.back_image),
        image_1: getImagePath(req.files.image_1),
        image_2: getImagePath(req.files.image_2),
        image_3: getImagePath(req.files.image_3),
    };

    // Construct data object for database entry

    const userId = value.user_id;

    try {

        const existingProduct = await prisma.products.findFirst({
            where: {
                BrandName: value.BrandName,
                BrandNameAr: value.BrandNameAr,
                productnameenglish: value.productnameenglish,
                productnamearabic: value.productnamearabic
            }
        });

        if (existingProduct) {
            throw createError(409, 'A product with the same brand names and product names already exists');
        }
        let user;
        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            user = await prisma.users.findUnique({ where: { id: userId } });
            if (!user) {
                throw createError(404, 'User not found');
            }

            if (user.parent_memberID !== '0') {
                user = await prisma.users.findUnique({ where: { id: user.parent_memberID } });
                if (!user) {
                    throw createError(404, 'User not found');
                }
            }

            const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
                where: {
                    user_id: user.id,
                    isDeleted: false,
                    status: 'active',
                },
                include: { gtin_product: true }
            });

            if (!gtinSubscriptions) {
                throw createError(404, `No active GTIN subscription found for the user ${user?.company_name_eng}`);
            }

            console.log(gtinSubscriptions)
            // /check      expiry_date: { gte: new Date() }

            checkExpiryDate(gtinSubscriptions.expiry_date);



            if (gtinSubscriptions?.gtin_subscription_limit === 0) {
                throw createError(403, 'Subscription limit exceeded, please upgrade your subscription');

            }
            const productsCount = gtinSubscriptions?.gtin_subscription_counter;
            console.log(productsCount)


            const gtin = await generateProdcutGTIN(user.gcpGLNID, productsCount);
            console.log(gtin)
            value.user_id = user.id;
            const productData = {
                ...value,
                ...images,
                gcpGLNID: user.gcpGLNID,
                barcode: gtin,
            };

            const newProduct = await prisma.products.create({ data: productData });

            // update the gtin_subcription table with new limit and counter
            const updatedGtinSubscription = await prisma.gtin_subcriptions.update({
                where: { id: gtinSubscriptions.id },
                data: {
                    gtin_subscription_counter: productsCount + 1,
                    gtin_subscription_limit: gtinSubscriptions.gtin_subscription_limit - 1
                }
            });


            return { newProduct, updatedGtinSubscription };
        });
        console.log(result)
        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `Certificate Regenerated by ${req?.admin?.email}`,
                admin_id: req.admin.adminId,
                user_id: user.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `Certificate Regenerated by ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }



        return res.status(201).json({
            message: 'Product created successfully.',
            product: result.newProduct,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};



const readExcelFile = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
};

const writeErrorsToExcel = (filePath, records) => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Determine the last column
    const ref = XLSX.utils.decode_range(worksheet['!ref']);
    const lastCol = ref.e.c;

    // Convert last column number to letter and set the error header
    const errorHeaderCell = XLSX.utils.encode_col(lastCol + 1) + '1'; // '1' for the first row
    worksheet[errorHeaderCell] = { v: 'Status' };

    // Write errors to the new "Error" column
    records.forEach((record, index) => {
        if (record.error) {
            const errorCellRef = XLSX.utils.encode_col(lastCol + 1) + (index + 2); // +2 to account for header row and 0-based index
            worksheet[errorCellRef] = { v: record.error };
        }
    });

    // Update the worksheet range to include the new column
    ref.e.c = lastCol + 1;
    worksheet['!ref'] = XLSX.utils.encode_range(ref);

    XLSX.writeFile(workbook, filePath);
};

const insertProduct = async (productData, user, productsCount) => {
    try {

        // check if user gtin subscription status is active or not
        // const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
        //     where: { user_id: user.id, isDeleted: false },
        //     include: { gtin_product: true }
        // });

        // if (!gtinSubscriptions) {
        //     throw createError(404, 'No active GTIN subscription found for the user');
        // }


        // check if the brand name exist for same user usin name_ar and companyID
        console.log("companyID", user.companyID, " .. ", productData.BrandName, " .. ", productData.BrandNameAr)
        const checkBrandName = await prisma.brands.findFirst({
            where: {
                name: productData.BrandName,
                name_ar: productData.BrandNameAr,
                companyID: user.companyID,
            }
        });

        if (!checkBrandName) {
            throw new Error(`Brand Name: ${productData.BrandName} not found for the companyID: ${user.companyID}`);
        }

        // Check for existing product
        const existingProduct = await prisma.products.findFirst({
            where: {
                BrandName: productData.BrandName,
                BrandNameAr: productData.BrandNameAr,
                productnameenglish: productData.productnameenglish,
                productnamearabic: productData.productnamearabic
            }
        });

        if (existingProduct) {
            throw new Error('A product with the same brand names and product names already exists');

        }

        if (productData.GTIN) {
            console.log("entered")
            const existingBarcode = await prisma.products.findFirst({
                where: { barcode: productData.GTIN }
            });


            if (existingBarcode) {
                throw new Error(`Duplicate GTIN: A product with GTIN ${productData.GTIN} already exists`);

            }
            productData.barcode = productData.GTIN;

            const isValidGCP = isValidGCPInBarcode(productData.GTIN, user.gcpGLNID);
            if (!isValidGCP) {
                throw new Error('gcpGLNID is not valid for the provided GTIN');
            }

        } else {
            // Generate new GTIN if not provided
            const gtin = await generateProdcutGTIN(user.gcpGLNID, productsCount);
            productData.barcode = gtin;
        }

        productData.gcpGLNID = user.gcpGLNID;

        // delete the GTIN field from the productData object
        delete productData.GTIN;
        const newProduct = await prisma.products.create({ data: productData });


        return newProduct;

    } catch (err) {
        console.error(err);
        return { error: err.message };
    }
};


export const bulkCreateProduct = async (req, res, next) => {
    const productSchema = Joi.object({
        user_id: Joi.string(),
        productnameenglish: Joi.string().allow('', null),
        productnamearabic: Joi.string().required(),
        BrandName: Joi.string().max(255).allow('', null),
        ProductType: Joi.string().max(50).allow('', null),
        Origin: Joi.string().max(50).allow('', null),
        PackagingType: Joi.string().max(50).allow('', null),
        MnfCode: Joi.string().max(50).allow('', null),
        MnfGLN: Joi.string().max(50).allow('', null),
        ProvGLN: Joi.string().max(50).allow('', null),
        // gpc: Joi.string().max(255).allow('', null),
        gpc_code: Joi.alternatives().try(Joi.string().max(50).allow('', null), Joi.number().allow('', null)),
        countrySale: Joi.string().max(50).allow('', null),
        HSCODES: Joi.string().allow('', null),
        memberID: Joi.string().allow('', null),
        admin_id: Joi.number().integer().allow('', null),
        save_as: Joi.string().max(20).allow('', null),
        // product_url: Joi.string().max(255).allow('', null),
        // product_link_url: Joi.string().max(255).allow('', null),
        BrandNameAr: Joi.string().allow('', null),
        prod_lang: Joi.string().max(50),
        // gtin field is optional as number or string
        GTIN: Joi.alternatives().try(Joi.string(), Joi.number().integer().max(99999999999999)),
        // digitalInfoType: Joi.number().integer().allow('', null),
        // readyForGepir: Joi.string().max(10).allow('', null),
        // gepirPosted: Joi.string().max(10).allow('', null),
    });

    let sendEmailFlag = true;
    let selectedLanguage = req.query.selectedLanguage || 'ar';
    let user;
    try {

        const getImagePath = (image) => {
            if (!image || image.length === 0) return null;
            const imageFile = image[0];
            imageFile.destination = imageFile.destination.replace('public', '');
            return path.join(imageFile.destination, imageFile.filename);
        };

        const images = {
            file: getImagePath(req.files.file),

        };

        console.log(req.files)


        const filePath = req.files.file[0].path;
        const records = readExcelFile(filePath);
        console.log(records)
        const errorRecords = [];


        user = await prisma.users.findUnique({ where: { id: req.body.user_id } });
        if (!user) {
            sendEmailFlag = false;
            // throw new Error('User not found')
            throw createError(404, 'User not found')
        }



        // Handle the parent member ID logic if applicable
        // if (user.parent_memberID !== '0' && user.parent_memberID !== null) {
        if (user.parent_memberID !== '0') {
            user = await prisma.users.findUnique({ where: { id: user.parent_memberID } });
            if (!user) {
                sendEmailFlag = false;
                // throw new Error('User not found')
                throw createError(404, 'User not found')

            }
        }
        const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
            where: {
                user_id: user.id,
                isDeleted: false,
                status: 'active',
            },
            include: { gtin_product: true }
        });

        if (!gtinSubscriptions) {
            sendEmailFlag = false;
            // throw new Error('Subscription not found')
            throw createError(404, `No active GTIN subscription found for the user ${user?.company_name_eng}`)
        }

        console.log(gtinSubscriptions)
        // /check      expiry_date: { gte: new Date() }

        checkExpiryDate(gtinSubscriptions.expiry_date);


        if (gtinSubscriptions.gtin_subscription_limit - records.length < 0) {
            sendEmailFlag = false;
            // throw new Error('Subscription limit exceeded, please upgrade your subscription')

            throw createError(403, 'Subscription limit exceeded, please upgrade your subscription')


        }

        // keep track of the number of products created
        let productsCount = gtinSubscriptions.gtin_subscription_counter;
        await prisma.$transaction(async (transaction) => {
            for (let record of records) {
                console.log(record)
                // Add GTIN handling
                // record.GTIN = record.GTIN || null;
                // console.log("Gtin", record.GTIN)
                // Map Excel columns to schema fields
                // convert Gtin to string

                record = {
                    user_id: req.body.user_id, // Assuming user_id comes from somewhere else like req.body
                    productnameenglish: record.ProductNameEnglish,
                    productnamearabic: record.ProductNameArabic,
                    BrandName: record.BrandName,
                    BrandNameAr: record.BrandNameAr,
                    ProductType: record.ProductType,
                    Origin: record['Country Of Origin'],
                    countrySale: record['Country of Sale'],
                    PackagingType: record.PackagingType,
                    MnfCode: record.MnfCode,
                    MnfGLN: record.MnfGLN,
                    ProvGLN: record.ProvGLN,
                    gpc_code: record['GPC Code']?.toString(),
                    memberID: record.memberID,
                    admin_id: record.admin_id,
                    save_as: record.save_as,
                    BrandNameAr: record.BrandNameAr,
                    prod_lang: record['Product Language Code'],
                    GTIN: record.GTIN?.toString(),
                    // Add other fields as necessary
                };

                const { error, value } = productSchema.validate(record);
                if (error) {
                    errorRecords.push({ ...record, error: error.details[0].message });
                } else {
                    try {
                        let data = value;
                        console.log(data)

                        const result = await insertProduct(data, user, productsCount);
                        if (!result.error) {
                            // Increment counter only if there's no error
                            productsCount++;
                            errorRecords.push({ ...record, error: "Processed Successfully" });
                        }

                        if (result.error) {
                            errorRecords.push({ ...record, error: result.error });
                        }

                    } catch (insertError) {
                        errorRecords.push({ ...record, error: insertError.message });
                    }
                }



            }

            // update the gtin_subcription table with new limit and counter
            await transaction.gtin_subcriptions.update({
                where: { id: gtinSubscriptions.id },
                data: {
                    gtin_subscription_counter: productsCount,
                    gtin_subscription_limit: gtinSubscriptions.gtin_subscription_limit - records.length
                }
            });


        }, { timeout: 40000 });


        // Write errors to Excel file if any
        if (errorRecords.length > 0) {
            writeErrorsToExcel(filePath, errorRecords);
        }

        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `GTIN Bulk Upload Processed by ${req?.admin?.email}`,
                admin_id: req.admin.adminId,
                user_id: user.id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `GTIN Bulk Upload Processed by ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }




        res.status(200).json({
            message: 'Bulk upload processed check your email for the processed file'
            , errors: errorRecords
        });
    } catch (err) {
        console.log(err);
        // res.status(500).json({ error: 'Internal server error' });
        next(err);
    } finally {
        if (sendEmailFlag) {
            const pdfBuffer = await fs1.readFile(req.files.file[0].path);
            const emailContent = selectedLanguage === 'en' ? `Dear User, <br><br> Your bulk upload file has been processed. Please find the attached file for the processed records. <br><br> Regards, <br> GS1 KSA` : `عزيزي المستخدم، <br><br> تم معالجة ملف التحميل الجماعي الخاص بك. يرجى العثور على الملف المرفق للسجلات المعالجة. <br><br> تحياتي، <br> GS1 KSA`;

            const attachments = [{
                filename: user?.memberID + '_processed_file.xlsx',
                content: pdfBuffer,
                contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }];

            await sendEmail({
                fromEmail: ADMIN_EMAIL,
                toEmail: req.body.email,

                subject: selectedLanguage === 'en' ? 'GTIN Bulk Upload Processed file' : 'ملف تحميل الجملة المعالج',

                htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
                // if status is approved, attach the certificate PDF
                attachments: attachments
            });
            // delete the file after sending the email
            await fs1.unlink(req.files.file[0].path);

        }
    }
};





export const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return next(createError(400, 'Product ID is required'));
    }

    // Joi schema for product validation
    const productSchema = Joi.object({
        user_id: Joi.string(),
        import_code: Joi.string().max(50).allow('', null),
        productnameenglish: Joi.string().allow('', null),
        productnamearabic: Joi.string().required(),
        BrandName: Joi.string().max(255).allow('', null),
        ProductType: Joi.string().max(50).allow('', null),
        Origin: Joi.string().max(50).allow('', null),
        PackagingType: Joi.string().max(50).allow('', null),
        MnfCode: Joi.string().max(50).allow('', null),
        MnfGLN: Joi.string().max(50).allow('', null),
        ProvGLN: Joi.string().max(50).allow('', null),
        unit: Joi.string().max(50).allow('', null),
        size: Joi.string().max(50).allow('', null),
        childProduct: Joi.string().max(255).allow('', null),
        quantity: Joi.string().max(10).allow('', null),
        gpc: Joi.string().max(255).allow('', null),
        gpc_code: Joi.string().max(50).allow('', null),
        countrySale: Joi.string().max(50).allow('', null),
        HSCODES: Joi.string().allow('', null),
        HsDescription: Joi.string().allow('', null),
        gcp_type: Joi.string().max(50).allow('', null),
        prod_lang: Joi.string().max(50).required(),
        details_page: Joi.string().allow('', null),
        details_page_ar: Joi.string().allow('', null),
        status: Joi.number().integer(),
        memberID: Joi.string().allow('', null),
        admin_id: Joi.number().integer().allow('', null),
        save_as: Joi.string().max(20).allow('', null),
        gtin_type: Joi.string().max(4).allow('', null),
        product_url: Joi.string().max(255).allow('', null),
        product_link_url: Joi.string().max(255).allow('', null),
        BrandNameAr: Joi.string().allow('', null),
        digitalInfoType: Joi.number().integer().allow('', null),
        readyForGepir: Joi.string().max(10).allow('', null),
        gepirPosted: Joi.string().max(10).allow('', null),

    });

    // Validate request body
    const { error, value } = productSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Retrieve the current product from the database
        const currentProduct = await prisma.products.findUnique({
            where: { id: productId }
        });

        if (!currentProduct) {
            return next(createError(404, 'Product not found'));
        }

        // Process new images and delete old ones if necessary
        const imageFields = ['front_image', 'back_image', 'image_1', 'image_2', 'image_3'];
        const dirname = path.dirname(fileURLToPath(import.meta.url));


        imageFields.forEach(field => {
            if (req.files[field]) {
                const imageFile = req.files[field][0];
                if (imageFile) { // Check if the file exists
                    const newImagePath = path.join(imageFile.destination, imageFile.filename);
                    if (currentProduct[field]) {
                        const oldImagePath = path.join(dirname, '..', 'public', currentProduct[field]);
                        console.log(oldImagePath)
                        if (fs.existsSync(oldImagePath)) {
                            fs.unlinkSync(oldImagePath);
                        }
                    }
                    // before saving the new path, remove the public from the path


                    value[field] = newImagePath.replace('public', '');
                }
            }
        });


        // Update the product in the database
        const updatedProduct = await prisma.products.update({
            where: { id: productId },
            data: value
        });


        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `GTIN Product updated by ${req?.admin?.email}`,
                admin_id: req.admin.adminId,
                user_id: updatedProduct.user_id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `GTIN Product updated by ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }




        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export const getAllprod_desc_languages = async (req, res, next) => {
    try {
        const AllUNSPSC = await prisma.prod_desc_languages.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });


        res.json(AllUNSPSC);
    }
    catch (error) {
        next(error);
    }
}



export const deleteProduct = async (req, res, next) => {
    // const productId = req.params.id;
    // use JOi to validate the id
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, `Invalid product ID: ${error.details[0].message}`));
    }

    const productId = value.id;

    try {
        // Retrieve the current product from the database
        const currentProduct = await prisma.products.findUnique({
            where: { id: productId }
        });

        if (!currentProduct) {
            return next(createError(404, 'Product not found'));
        }

        // Process and delete existing images
        const imageFields = ['front_image', 'back_image', 'image_1', 'image_2', 'image_3'];
        const dirname = path.dirname(fileURLToPath(import.meta.url));
        imageFields.forEach(field => {
            const imagePath = currentProduct[field];
            if (imagePath) {
                const absoluteImagePath = path.join(dirname, '..', imagePath);
                if (fs.existsSync(absoluteImagePath)) {
                    fs.unlinkSync(absoluteImagePath);
                }
            }
        });

        // Delete the product from the database
        await prisma.products.delete({ where: { id: productId } });
        if (req?.admin?.adminId) {

            const adminLog = {
                subject: `GTIN Product deleted by ${req?.admin?.email}`,
                admin_id: req.admin.adminId,
                user_id: currentProduct.user_id,

            }
            await createAdminLogs(adminLog);
        }

        if (req?.user?.userId) {

            const userLog = {
                subject: `GTIN Product deleted by ${req?.user?.email}`,
                user_id: req.user.userId,
            }
            await createMemberLogs(userLog);
        }



        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export async function convertEjsToPdf2(ejsFilePath, data, landscapeMode = false) {
    try {
        const ejsTemplate = await fs.promises.readFile(ejsFilePath, 'utf-8');
        const htmlContent = ejs.render(ejsTemplate, { data });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const pdfOptions = {
            format: 'A4',
            printBackground: true,
            landscape: landscapeMode,
        };

        const pdfBuffer = await page.pdf(pdfOptions);
        await browser.close();

        return pdfBuffer;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}

export const generateGtinCertificate = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const selectedLanguage = req.query.selectedLanguage || 'ar';

        // Fetch product details using productId
        const product = await prisma.products.findFirst({
            where: {
                id: productId,
                deleted_at: null,
            },
        });

        if (!product) {
            return res.status(404).json({ status: 404, message: 'Product not found!' });
        }

        // Fetch member details using user_id from product
        const member = await prisma.users.findFirst({
            where: {
                id: product.user_id,
            },
        });
        let gcp_expiry = new Date(member.gcp_expiry);
        console.log(req.protocol + '://' + req.get('host'))
        // Define data object for EJS template
        const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');
        const data = {
            qrCodeDataURL: qrCodeDataURL,
            BACKEND_URL: req.protocol + '://' + req.get('host'), // Construct backend URL
            member: {
                company_name_eng: member.company_name_eng,
            },
            memberProduct: {
                barcode: product.barcode,
            },
            user: {
                companyID: member.companyID,
                gcpGLNID: member.gcpGLNID,
            },
            date: {
                day: gcp_expiry.getDate(),
                month: gcp_expiry.getMonth() + 1,
                year: gcp_expiry.getFullYear() - 1,
            },
            Expirydate: {
                day: gcp_expiry.getDate(),
                month: gcp_expiry.getMonth() + 1,
                year: gcp_expiry.getFullYear(),
            },
        };

        // Generate PDF using provided function

        let ejsFile = selectedLanguage === "en" ? 'gtinCertificate.ejs' : 'gtinCertificate_Ar.ejs';
        const pdfBuffer = await convertEjsToPdf2(path.join(__dirname, '..', 'views', 'pdf', ejsFile), data);

        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${productId}_gtin_certificate.pdf"`);
        // Send PDF buffer as response
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
};