import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';

import XLSX from 'xlsx';
import path from 'path';
import fs1 from 'fs/promises';
import fs from 'fs';

import { generateProdcutGTIN, isValidGCPInBarcode } from '../utils/functions/barcodesGenerator.js';
import { ADMIN_EMAIL } from '../configs/envConfig.js';
import { sendEmail } from '../services/emailTemplates.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const getProducts = async (req, res, next) => {
    try {
        // Define allowable columns for filtering (for products)
        const allowedColumns = {
            id: Joi.string(),
            user_id: Joi.string(),
            gcpGLNID: Joi.string(),
            memberID: Joi.string(),

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

        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            let user = await prisma.users.findUnique({ where: { id: userId } });
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
                where: { user_id: user.id },
                include: { gtin_product: true }
            });

            if (gtinSubscriptions.length === 0) {
                throw createError(404, 'Subscription not found');
            }
            console.log(gtinSubscriptions)
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

const insertProduct = async (productData) => {
    try {
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

        let user = await prisma.users.findUnique({ where: { id: productData.user_id } });
        if (!user) {
            throw new Error('User not found');
        }

        if (user.parent_memberID !== '0') {
            user = await prisma.users.findUnique({ where: { id: user.parent_memberID } });
            if (!user) {
                throw new Error('User not found');
            }
        }

        const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
            where: { user_id: user.id },
            include: { gtin_product: true }
        });

        if (!gtinSubscriptions || gtinSubscriptions.length === 0) {
            throw new Error('Subscription not found');
        }

        if (gtinSubscriptions?.gtin_subscription_limit === 0) {
            throw new Error('Subscription limit exceeded, please upgrade your subscription');
        }

        const productsCount = gtinSubscriptions?.gtin_subscription_counter;

       

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

        // update the gtin_subcription table with new limit and counter
        const updatedGtinSubscription = await prisma.gtin_subcriptions.update({
            where: { id: gtinSubscriptions.id },
            data: {
                gtin_subscription_counter: productsCount + 1,
                gtin_subscription_limit: gtinSubscriptions.gtin_subscription_limit - 1
            }
        });

        return newProduct;

    } catch (err) {
        console.error(err);
        // throw new Error(err.message);
        return { error: err.message };
    }
};


export const bulkCreateProduct = async (req, res) => {
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
        gpc_code: Joi.string().max(50).allow('', null),
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
                    gpc_code: record['GPC Code'],
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
                        data.user_id = req.body.user_id;
                        const result = await insertProduct(data, transaction);
                        if (result.error) {
                            errorRecords.push({ ...record, error: result.error });
                        }
                    } catch (insertError) {
                        errorRecords.push({ ...record, error: insertError.message });
                    }
                }



            }


        }, { timeout: 40000 });


        // Write errors to Excel file if any
        if (errorRecords.length > 0) {
            writeErrorsToExcel(filePath, errorRecords);
        }

        res.status(200).json({
            message: 'Bulk upload processed check your email for the processed file'
            , errors: errorRecords
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        const pdfBuffer = await fs1.readFile(req.files.file[0].path);
        const emailContent = `Dear User, <br><br> Your bulk upload file has been processed. Please find the attached file for the processed records. <br><br> Regards, <br> GS1 KSA`;
        const attachments = [{
            filename: req.files.file[0].filename,
            content: pdfBuffer,
            contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }];

        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: req.body.email,
            subject: 'GTIN Bulk Upload Processed file',

            htmlContent: `<div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">${emailContent}</div>`,
            // if status is approved, attach the certificate PDF
            attachments: attachments
        });
        // delete the file after sending the email
        await fs1.unlink(req.files.file[0].path);

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

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
