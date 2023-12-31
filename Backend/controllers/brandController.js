// brandsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import path from 'path';
import fs from 'fs';
const brandSchema = Joi.object({
    name: Joi.string().max(255).required(),
    name_ar: Joi.string().max(255).required(),
    status: Joi.string().valid('active', 'inactive').required(),
    user_id: Joi.string().required(),
    companyID: Joi.string().required(),
});

export const createBrand = async (req, res, next) => {
    try {
        const { error, value } = brandSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }


        // apply check to check if user status is active or not use optized approach to check this
        const user = await prisma.users.findUnique({
            where: {
                id: value.user_id,
            },
        });
        if (!user) {
            throw createError(404, 'User not found');
        }
        if (user.status !== 'active') {
            throw createError(400, 'User is not active');
        }


        // Check if brand name or brand name_ar already exists
        // Check if brand name (English) already exists
        const existingBrandByName = await prisma.brands.findFirst({
            where: { name: value.name },
        });

        if (existingBrandByName) {
            throw createError(400, 'Brand name (English) already exists');
        }

        // Check if brand name_ar (Arabic) already exists
        const existingBrandByNameAr = await prisma.brands.findFirst({
            where: { name_ar: value.name_ar },
        });

        if (existingBrandByNameAr) {
            throw createError(400, 'Brand name (Arabic) already exists');
        }
        const uploadedCertificate = req.files?.brandCertificate;
        if (!uploadedCertificate) {
            throw createError(400, 'Brand certificate is required');
        }

        const certificate = uploadedCertificate[0];
        const certificateName = certificate.filename;
        certificate.destination = certificate.destination.replace('public', '');
        const certificatePath = path.join(certificate.destination, certificateName);

        let brandData = {
            ...value,
            brand_certificate: certificatePath,
        };


        const brand = await prisma.brands.create({
            data: brandData,
        });

        res.status(201).json(brand);
    } catch (error) {
        next(error);
    }
};




const allowedColumns = {
    id: Joi.string(),
    name: Joi.string(),
    status: Joi.string(),
    user_id: Joi.string(),
    companyID: Joi.string(),
    // Add more columns as needed
};


const filterSchema = Joi.object(
    Object.keys(allowedColumns).reduce((schema, column) => {
        schema[column] = allowedColumns[column];
        return schema;
    }, {})
).unknown(false); // Disallows any keys that are not defined in the schema

export const getBrands = async (req, res, next) => {
    try {
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

        const brands = await prisma.brands.findMany({
            where: filterConditions,
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });

        res.json(brands);
    } catch (error) {
        next(error);
    }
};


export const searchBrands = async (req, res, next) => {
    // const { keyword } = req.query; 
    // use Joi 
    const schema = Joi.object({
        keyword: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.query);
    if (error) {
        return next(createError(400, error.details[0].message));
    }
    const { keyword } = value;

    try {
        // Get the search keyword from the query parameters

        // Define the searchable columns for brands
        const searchableColumns = [
            'name',
            'name_ar',
            'status',
            'user_id',
            'companyID',
            'brand_certificate'
        ];

        // Construct the search conditions for Prisma query
        const searchConditions = {
            OR: searchableColumns.map(column => ({
                [column]: {
                    contains: keyword.toLowerCase(), // Convert keyword to lowercase
                },
            })),
        };

        // Fetch the top 30 latest records that match the search conditions
        const brands = await prisma.brands.findMany({
            where: searchConditions,
            orderBy: { created_at: 'desc' }, // Sort by created_at in descending order
            take: 30, // Limit to 30 records
        });

        return res.json(brands);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const searchMemberBrands = async (req, res, next) => {
    // const { keyword } = req.query; 
    // use Joi 
    const schema = Joi.object({
        keyword: Joi.string().required(),
        user_id: Joi.string().required(),

    });
    const { error, value } = schema.validate(req.query);
    if (error) {
        return next(createError(400, error.details[0].message));
    }
    const { keyword } = value;

    try {
        // Get the search keyword from the query parameters

        // Define the searchable columns for brands
        const searchableColumns = [
            'name',
            'name_ar',
            'status',
            'companyID',
            'brand_certificate'
        ];

        // Construct the search conditions for Prisma query
        const searchConditions = {
            AND: [
                { user_id: req.query.user_id }, // Search based on user_id
                {
                    OR: searchableColumns.map(column => ({
                        [column]: {
                            contains: keyword.toLowerCase(), // Convert keyword to lowercase
                        },
                    })),
                },
            ],
        };

        // Fetch the top 30 latest records that match the search conditions
        const brands = await prisma.brands.findMany({
            where: searchConditions,
            orderBy: { created_at: 'desc' }, // Sort by created_at in descending order
            take: 30, // Limit to 30 records
        });
        return res.json(brands);
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const updateBrandSchema = Joi.object({
    name: Joi.string().max(255),
    name_ar: Joi.string().max(255),
    status: Joi.string().valid('active', 'inactive'),
    user_id: Joi.string(),
    companyID: Joi.string(),
});


export const updateBrand = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'Brand id is required' });

        const { error, value } = updateBrandSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Retrieve the current brand data
        const currentBrand = await prisma.brands.findUnique({
            where: { id: id },
        });

        if (!currentBrand) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        const uploadedCertificate = req.files?.brandCertificate;
        if (uploadedCertificate) {
            const certificate = uploadedCertificate[0];
            const certificateName = certificate.filename;
            certificate.destination = certificate.destination.replace('public', '');
            const certificatePath = path.join(certificate.destination, certificateName);

            // Delete the existing file if it exists
            if (currentBrand.brand_certificate) {
                const existingFilePath = path.join('public', currentBrand.brand_certificate);
                if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                }
            }

            value.brand_certificate = certificatePath;
        }

        const updatedBrand = await prisma.brands.update({
            where: { id: id },
            data: value,
        });

        res.json(updatedBrand);
    } catch (error) {
        next(error);
    }
};



export const deleteBrand = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error, value } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = value;




        const brand = await prisma.brands.deleteMany({
            where: { id: id },
        });
        console.log(brand);
        if (brand.count === 0) {
            return next(createError(404, 'Brand not found'));
        }


        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        next(error);
    }
};
