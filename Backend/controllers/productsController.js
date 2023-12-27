import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import { generateProdcutGTIN } from '../utils/functions/barcodesGenerator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const getProducts = async (req, res, next) => {
    try {
        // Define allowable columns for filtering (for products)
        const allowedColumns = {
            id: Joi.string(),
            user_id: Joi.string(),
            gcpGLNID: Joi.string(),
            memberID: Joi.string(),


            // ... define validation for other allowed columns for products
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

export const createProduct = async (req, res, next) => {
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

        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            let user = await prisma.users.findUnique({ where: { id: userId } });
            if (!user) {
                return next(createError(404, 'User not found'));
            }

            if (user.parent_memberID !== '0') {
                user = await prisma.users.findUnique({ where: { id: user.parent_memberID } });
                if (!user) {
                    return next(createError(404, 'User not found'));
                }
            }

            const gtinSubscriptions = await prisma.gtin_subcriptions.findFirst({
                where: { user_id: user.id },
                include: { gtin_product: true }
            });

            if (gtinSubscriptions.length === 0) {
                return next(createError(404, 'User has no GTIN subscriptions'));
            }
            console.log(gtinSubscriptions)
            const totalNoOfBarcodes = gtinSubscriptions?.gtin_product.total_no_of_barcodes;
            const productsCount = await prisma.products.count({
                where: { user_id: user.id, gcpGLNID: user.gcpGLNID }
            });


            if (productsCount + 1 >= totalNoOfBarcodes) {
                return next(createError(400, 'Barcodes limit exceeded'));
            }

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
            return { newProduct };
        });


        res.status(201).json({
            message: 'Product created successfully.',
            product: result.newProduct,
        });
    } catch (err) {
        console.error(err);
        next(err);
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
                const newImagePath = path.join(imageFile.destination, imageFile.filename);
                const oldImagePath = path.join(dirname, '..', currentProduct[field]);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }

                value[field] = newImagePath; // Update path in the object to be saved
            }
        });

        // Update the product in the database
        const updatedProduct = await prisma.products.update({
            where: { id: productId },
            data: value
        });

        res.json(updatedProduct);
    } catch (err) {
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


