import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';


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


export const createGLNs = async (req, res, next) => {


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


            const otherProductSubscriptions = await prisma.other_products_subcriptions.findMany({
                where: {
                    user_id: user.id,
                    status: 'active',
                    product_identifier_name: "gln"
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


          

            if (otherProductSubscriptions.length === 0) {
                throw createError(400, 'No active subscription found');
            }
            console.log(otherProductSubscriptions)



            const productsCount = otherProductSubscriptions?.other_products_subscription_counter;

            if (otherProductSubscriptions?.oter_products_subscription_limit == 0) {
                throw createError(403, 'Subscription limit exceeded');
            }

            // const gln = await generateGLN(user.gcpGLNID, productsCount);
            // console.log(gln)
            const newGLN = await prisma.gln.create({
                data: {
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
                    // GLNBarcodeNumber: barcodeNumber,
                },
            });

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
export const createGLN = async (req, res, next) => {
    try {
        // Validate request body for GLN
        const { error, value } = glnSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { user_id, product_id } = value;

        // Fetch the user
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch the product
        const product = await prisma.add_member_gln_products.findUnique({ where: { id: product_id } });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Count member products
        const memberProductCount = await prisma.add_member_gln_products.count({
            where: {
                user_id: user_id,
                gcpGLNID: user.gcpGLNID,
            },
        });

        const productRange = memberProductCount + 1;
        const ssccBarcodeLimit = product.total_no_of_barcodes;

        if (productRange >= ssccBarcodeLimit) {
            return res.status(400).json({ message: 'Limit Exceeded' });
        }

        const gcpGLNID = user.gcpGLNID;
        const gcpLength = gcpGLNID.toString().length;

        if (gcpLength < 7 || gcpLength > 11) {
            return res.status(400).json({ message: 'Invalid GLN calculation' });
        }

        let barcodeNumber = 0;

        switch (gcpLength) {
            case 7:
                // Call your lengthSeven function here
                break;
            case 8:
                // Call your lengthEight function here
                break;
            case 9:
                // Call your lengthNine function here
                break;
            case 10:
                // Call your lengthTen function here
                break;
            case 11:
                // Call your lengthEleven function here
                break;
            default:
                return res.status(400).json({ message: 'Invalid GLN calculation' });
        }

        // Call your checkGLNTrashed function here
        // Calculate ean13_checkDigit here

        // Save GLN data to the database
        const newGLN = await prisma.gln.create({
            data: {
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
                GLNBarcodeNumber: barcodeNumber,
            },
        });

        // Log the action
        console.log(`${user.fname || user.company_name_eng} Add New GLN.`);

        return res.status(201).json({ message: 'GLN created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    } finally {
        await prisma.$disconnect();
    }
}