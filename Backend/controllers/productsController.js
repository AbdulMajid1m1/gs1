import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import fs from 'fs';
import path from 'path';

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
        gcpGLNID: Joi.string().max(50),
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
        barcode: Joi.string().max(50).allow('', null),
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
        deleted_at: Joi.date().allow('', null),
        created_at: Joi.date().allow('', null),
        updated_at: Joi.date().allow('', null),
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
    const productData = {
        ...value,
        ...images,
    };

    // Save product details in the database using Prisma
    try {
        const newProduct = await prisma.products.create({
            data: productData
        });

        res.status(201).json({
            message: 'Product created successfully.',
            product: newProduct,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};