import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

import { calculateGLN } from '../utils/functions/barcodesGenerator.js';


const __dirname = path.dirname(fileURLToPath(import.meta.url));




// Joi schema for GLN validation
const glnSchema = Joi.object({
    user_id: Joi.string().required(),
    locationNameEn: Joi.string(),
    locationNameAr: Joi.string(),
    AddressEn: Joi.string(),
    AddressAr: Joi.string(),
    pobox: Joi.string(),
    postal_code: Joi.string(),
    longitude: Joi.string().required(),
    latitude: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive').required(),
});


export const createGLN = async (req, res, next) => {


    // Validate request body
    const { error, value } = glnSchema.validate(req.body);
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
        gln_image: getImagePath(req.files.front_image),
    };

    // Construct data object for database entry

    const userId = value.user_id;

    try {

        // Start a transaction
        const result = await prisma.$transaction(async (prisma) => {
            let user = await prisma.users.findUnique({ where: { id: userId } });
            if (!user) {
                throw createError(404, 'User not found');
            }

            if (user.parent_memberID !== '0') {
                if (user.parent_memberID === null) return next(createError(404, 'User not found'));
                user = await prisma.users.findUnique({ where: { id: user.parent_memberID } });
                if (!user) {
                    throw createError(404, 'User not found');
                }
            }

            const otherProductSubscriptions = await prisma.other_products_subcriptions.findFirst({
                where: {
                    user_id: user.id,
                    status: 'active',
                    product_identifier_name: {
                        in: ["GLN (20 Locations)", "GLN (10 Locations)", "GLN (30 Locations)"]
                    }
                },
                include: {
                    product: {
                        select: {
                            product_name: true,
                            total_no_of_barcodes: true,
                        }
                    }
                }
            });




            if (!otherProductSubscriptions) {
                throw createError(400, 'No active subscription found');
            }
            console.log(otherProductSubscriptions)




            if (otherProductSubscriptions?.other_products_subscription_limit == 0) {
                throw createError(403, 'Subscription limit exceeded');
            }

            const productsCount = otherProductSubscriptions?.other_products_subscription_counter;
            // const total_no_of_barcodes = otherProductSubscriptions?.product?.total_no_of_barcodes;
            const gln = await calculateGLN(productsCount, user.gcpGLNID);
            console.log(gln)
            if (gln === "false") {
                throw createError(400, 'Invalid GLN calculation');
            }




            const newGLN = await prisma.add_member_gln_products.create({
                data: {
                    product_id: otherProductSubscriptions?.product_id,
                    gcpGLNID: user.gcpGLNID,
                    user_id: user.id,
                    locationNameEn: value.locationNameEn,
                    locationNameAr: value.locationNameAr,
                    AddressEn: value.AddressEn,
                    AddressAr: value.AddressAr,
                    pobox: value.pobox,
                    postal_code: value.postal_code,
                    longitude: value.longitude,
                    latitude: value.latitude,
                    status: value.status,
                    GLNBarcodeNumber: gln,
                    image: images.gln_image,
                },
            });

            //  update other_products_subcriptions table
            await prisma.other_products_subcriptions.update({
                where: {
                    id: otherProductSubscriptions.id,
                },
                data: {
                    other_products_subscription_counter: productsCount + 1,
                    other_products_subscription_limit: otherProductSubscriptions.other_products_subscription_limit - 1,
                },
            });

            return { newGLN, otherProductSubscriptions };
        });

        console.log(result);

        res.status(201).json({
            message: 'GLN created successfully.',
            product: result.newGLN,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};





export const getGLNProductsDetails = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            product_id: Joi.string(),
            user_id: Joi.string(),
            locationNameEn: Joi.string(),
            locationNameAr: Joi.string(),

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

        // Construct filter conditions for Prisma query
        const filterConditions = {};
        if (Object.keys(value).length > 0) {
            Object.entries(value).forEach(([key, val]) => {
                filterConditions[key] = val;
            });
        }

        // Fetch GLN products based on filter conditions
        const glnProducts = await prisma.add_member_gln_products.findMany({
            where: filterConditions,
            // include: { ... } // include related models if necessary
        });

        // Optionally, sort the results
        // Example: Sorting by a certain field (if required)

        return res.json(glnProducts);
    } catch (error) {
        console.log(error);
        next(error);
    }
};



export const updateGLN = async (req, res, next) => {
    const glnId = req.params.id;
    if (!glnId) {
        return next(createError(400, 'GLN ID is required'));
    }

    // Joi schema for GLN validation
    const glnSchema = Joi.object({
        user_id: Joi.string(),
        locationNameEn: Joi.string(),
        locationNameAr: Joi.string(),
        AddressEn: Joi.string(),
        AddressAr: Joi.string(),
        pobox: Joi.string(),
        postal_code: Joi.string(),
        longitude: Joi.string(),
        latitude: Joi.string(),
        status: Joi.string().valid('active', 'inactive'),
        // ... define validation for other GLN fields
    });

    // Validate request body
    const { error, value } = glnSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Retrieve the current GLN from the database
        const currentGLN = await prisma.add_member_gln_products.findUnique({
            where: { id: glnId }
        });

        if (!currentGLN) {
            return next(createError(404, 'GLN not found'));
        }

        // Process new GLN fields and image uploads
        const imageField = 'image'; // Adjust this to your GLN schema
        const dirname = path.dirname(fileURLToPath(import.meta.url));

        if (req.files && req.files.gln_image) {
            const imageFile = req.files.gln_image[0];
            if (imageFile) {
                // Check if the file exists
                const newImagePath = path.join(imageFile.destination, imageFile.filename);
                if (currentGLN[imageField]) {
                    // Delete the old image if it exists
                    const oldImagePath = path.join(dirname, '..', 'public', currentGLN[imageField]);
                    console.log(oldImagePath);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
                // Update the GLN image path
                value[imageField] = newImagePath.replace('public', '');
            }
        }

        // Update the GLN data in the database
        const updatedGLN = await prisma.add_member_gln_products.update({
            where: { id: glnId },
            data: value
        });

        res.json(updatedGLN);
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const deleteGLN = async (req, res, next) => {


    // Use Joi to validate the id
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, `Invalid GLN ID: ${error.details[0].message}`));
    }

    const glnId = value.id;
    try {
        // Retrieve the current GLN from the database
        const currentGLN = await prisma.add_member_gln_products.findUnique({
            where: { id: glnId }
        });

        if (!currentGLN) {
            return next(createError(404, 'GLN not found'));
        }

        // Process and delete existing GLN image
        const imageField = 'image'; // Adjust this to your GLN schema
        const dirname = path.dirname(fileURLToPath(import.meta.url));
        const imagePath = currentGLN[imageField];
        if (imagePath) {
            const absoluteImagePath = path.join(dirname, '..', 'public', imagePath);
            if (fs.existsSync(absoluteImagePath)) {
                fs.unlinkSync(absoluteImagePath);
            }
        }

        // Delete the GLN from the database
        await prisma.add_member_gln_products.delete({ where: { id: glnId } });

        res.status(200).json({ message: 'GLN deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


