import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { generateSSCCBarcode } from '../utils/functions/barcodesGenerator.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const ssccSchema = Joi.object({
    sscc_type: Joi.string().max(255),
    product_id: Joi.string(),
    reference_id: Joi.string(),
    VendorID: Joi.string().max(255),
    VendorName: Joi.string().max(255),
    productID: Joi.string().max(255),
    description: Joi.string().max(255),
    SerialNumber: Joi.string().max(255),
    ItemCode: Joi.string().max(255),
    Qty: Joi.string().max(255),
    UseBy: Joi.string().max(255),
    BatchNo: Joi.string().max(255),
    Boxof: Joi.string().max(255),
    hsn_sku: Joi.string().max(255),
    po_no: Joi.string().max(255),
    expiraton_date: Joi.string().max(255),
    ship_to: Joi.string().max(255),
    ship_date: Joi.string().max(255),
    vendor_item_no: Joi.string().max(255),
    short_qty_code: Joi.string().max(255),
    country_id: Joi.string().max(255),
    carton: Joi.string().max(255),
    SSCCBarcodeNumber: Joi.string().max(255),
    SSCCBarcodeNumber_without_check: Joi.string().max(255),
    user_id: Joi.string(),
});

export const createSSCC = async (req, res, next) => {
    // Validate request body
    const { error, value } = ssccSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const userId = value.user_id;

    try {
        const result = await prisma.$transaction(async (prisma) => {
            let user = await prisma.users.findUnique({ where: { id: userId } });
            if (!user) throw createError(404, 'User not found');


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
                    product_identifier_name: "SSCC" // Changed to SSCC
                },
                include: {
                    product: true // Assuming you need the product details
                }
            });

            if (!otherProductSubscriptions) throw createError(400, 'No active subscription found');

            if (otherProductSubscriptions.other_products_subscription_limit === 0) {
                throw createError(403, 'Subscription limit exceeded');
            }

            const productsCount = otherProductSubscriptions.other_products_subscription_counter;
            const sscc = await generateSSCCBarcode(user.gcpGLNID, productsCount);

            if (sscc === "false") {
                throw createError(400, 'Invalid SSCC calculation');
            }

            const newSSCCData = {
                SSCCBarcodeNumber: sscc,

                user_id: user.id,
                // Add other fields here
                ...(value.sscc_type && { sscc_type: value.sscc_type }),
                ...(value.product_id && { product_id: value.product_id }),
                ...(value.reference_id && { reference_id: value.reference_id }),
                ...(value.VendorID && { VendorID: value.VendorID }),
                ...(value.VendorName && { VendorName: value.VendorName }),
                ...(value.productID && { productID: value.productID }),
                ...(value.description && { description: value.description }),
                ...(value.SerialNumber && { SerialNumber: value.SerialNumber }),
                ...(value.ItemCode && { ItemCode: value.ItemCode }),
                ...(value.Qty && { Qty: value.Qty }),
                ...(value.UseBy && { UseBy: value.UseBy }),
                ...(value.BatchNo && { BatchNo: value.BatchNo }),
                ...(value.Boxof && { Boxof: value.Boxof }),
                ...(value.hsn_sku && { hsn_sku: value.hsn_sku }),
                ...(value.po_no && { po_no: value.po_no }),
                ...(value.expiraton_date && { expiraton_date: value.expiraton_date }),
                ...(value.ship_to && { ship_to: value.ship_to }),
                ...(value.ship_date && { ship_date: value.ship_date }),
                ...(value.vendor_item_no && { vendor_item_no: value.vendor_item_no }),
                ...(value.short_qty_code && { short_qty_code: value.short_qty_code }),
                ...(value.country_id && { country_id: value.country_id }),
                ...(value.carton && { carton: value.carton }),
                ...(value.SSCCBarcodeNumber_without_check && { SSCCBarcodeNumber_without_check: value.SSCCBarcodeNumber_without_check }),
                ...(value.user_id && { user_id: value.user_id }),
                ...(value.gcpGLNID && { gcpGLNID: value.gcpGLNID }),
            };

            const newSSCC = await prisma.add_member_sscc_products.create({
                data: newSSCCData,
            });

            // Update counter in other_products_subcriptions
            await prisma.other_products_subcriptions.update({
                where: { id: otherProductSubscriptions.id },
                data: {
                    other_products_subscription_counter: productsCount + 1,
                    other_products_subscription_limit: otherProductSubscriptions.other_products_subscription_limit - 1,
                },
            });

            return { newSSCC, otherProductSubscriptions };
        });

        res.status(201).json({
            message: 'SSCC created successfully.',
            product: result.newSSCC,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export const getSSCCProductsDetails = async (req, res, next) => {
    try {
        // Define allowable columns for filtering (customize this based on your schema)
        const allowedColumns = {
            id: Joi.string(),
            product_id: Joi.string(),
            user_id: Joi.string(),
            // Add other filterable columns here
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

        // Fetch SSCC products based on filter conditions
        const ssccProducts = await prisma.add_member_sscc_products.findMany({
            where: filterConditions,
        });


        return res.json(ssccProducts);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


const ssccUpdateSchema = Joi.object({
    sscc_type: Joi.string().max(255),
    product_id: Joi.string(),
    reference_id: Joi.string(),
    VendorID: Joi.string().max(255),
    VendorName: Joi.string().max(255),
    productID: Joi.string().max(255),
    description: Joi.string().max(255),
    SerialNumber: Joi.string().max(255),
    ItemCode: Joi.string().max(255),
    Qty: Joi.string().max(255),
    UseBy: Joi.string().max(255),
    BatchNo: Joi.string().max(255),
    Boxof: Joi.string().max(255),
    hsn_sku: Joi.string().max(255),
    po_no: Joi.string().max(255),
    expiraton_date: Joi.string().max(255),
    ship_to: Joi.string().max(255),
    ship_date: Joi.string().max(255),
    vendor_item_no: Joi.string().max(255),
    short_qty_code: Joi.string().max(255),
    country_id: Joi.string().max(255),
    carton: Joi.string().max(255),
});

export const updateSSCC = async (req, res, next) => {
    const ssccIdSchema = Joi.string().required();

    const { error: ssccIdError, value: ssccIdValue } = ssccIdSchema.validate(req.params.ssccId);
    if (ssccIdError) {
        return res.status(400).json({ error: ssccIdError.details[0].message });
    }

    const ssccId = ssccIdValue;
    // validate request body 
    const { error, value } = ssccUpdateSchema.validate(req.body);


    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }



    try {
        // Fetch the existing SSCC product
        let existingSSCC = await prisma.add_member_sscc_products.findUnique({
            where: { id: ssccId }
        });

        if (!existingSSCC) {
            return res.status(404).json({ message: 'SSCC product not found' });
        }

        // Update the SSCC product
        const updatedSSCC = await prisma.add_member_sscc_products.update({
            where: { id: ssccId },
            data: value // Assuming 'value' contains the updated fields
        });

        res.status(200).json({
            message: 'SSCC updated successfully',
            product: updatedSSCC
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};


export const deleteSSCC = async (req, res, next) => {
    // Use Joi to validate the id
    const schema = Joi.object({
        id: Joi.string().required()
    });

    const { error, value } = schema.validate(req.params);
    if (error) {
        return next(createError(400, `Invalid SSCC ID: ${error.details[0].message}`));
    }

    const ssccId = value.id;
    try {
        // Retrieve the current SSCC product from the database
        const currentSSCC = await prisma.add_member_sscc_products.findUnique({
            where: { id: ssccId }
        });

        if (!currentSSCC) {
            return next(createError(404, 'SSCC product not found'));
        }

        // Process and delete existing SSCC product image (if applicable)
        const imageField = 'image'; // Adjust this to your SSCC schema
        const dirname = path.dirname(fileURLToPath(import.meta.url));
        const imagePath = currentSSCC[imageField];
        if (imagePath) {
            const absoluteImagePath = path.join(dirname, '..', 'public', imagePath);
            if (fs.existsSync(absoluteImagePath)) {
                fs.unlinkSync(absoluteImagePath);
            }
        }

        // Delete the SSCC product from the database
        await prisma.add_member_sscc_products.delete({ where: { id: ssccId } });

        res.status(200).json({ message: 'SSCC product deleted successfully' });
    } catch (err) {
        console.error(err);
        next(err);
    }
};
