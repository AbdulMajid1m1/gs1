import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import axios from 'axios';
import { gs1dlPrisma, wtracePrisma } from '../prismaMultiClinets.js';
import { brandOwnerMarkers, ifBatch, ifSerial, normalSearch } from '../utils/functions/foreignGtinFunctions.js';


export const getGtinProductDetailsFromLocalDb = async (req, res, next) => {


    try {

        const schema = Joi.object({
            barcode: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { barcode } = value;

        const product = await prisma.products.findFirst({
            where: {
                barcode: {
                    contains: barcode,
                },
            },
            include: {
                user: true,
            },
        },
        );

        if (!product) {
            throw createError(404, "Product not found");
        }

        // const response = {
        //     ...product,
        //     moName: 'GS1 SAUDI ARABIA',
        //     type: 'local',
        //     // Additional fields can be added here as necessary
        // };
        console.log(product);
        const response = {

            gtin: product.barcode,
            companyName: product.user?.company_name_eng,
            gpcCategoryCode: product.gpc_code,
            brandName: product.BrandName,
            productDescription: product.details_page,
            productImageUrl: product.front_image,
            unitCode: product.unit,
            unitValue: product.size,
            countryOfSaleCode: product.countrySale,
            productName: product.productnameenglish,
            gcpGLNID: product.user?.gcpGLNID,
            status: product.status === 1 ? 'Active' : 'InActive',
            licenceKey: product.user?.gcpInformation?.key_pk ?? '',
            licenceType: product.user?.gcpInformation?.type_pk ?? '',
            moName: 'GS1 SAUDI ARABIA',
            type: 'local',
            countryOfSaleName: product?.countrySale ?? '',
            // Additional fields can be added here as necessary
        };

        return res.status(200).send(response);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}

export const getGtinProductDetailsFromGlobalDb = async (req, res, next) => {
    try {
        // Validate barcode input
        const schema = Joi.object({
            barcode: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);
        if (error) {
            throw new Error(error.details[0].message);
        }

        const { barcode } = value;
        const updatedGTIN = '0' + barcode;

        // Setup the request headers and body as needed
        const headers = {
            'APIKey': 'a54f5b6535994ffeb88b575198faac11',
        };

        // Define the URL for the global database API
        const apiUrl = 'https://grp.gs1.org/grp/v3/gtins/verified';

        // Making the POST request to the global DB API
        const response = await axios.post(apiUrl, [updatedGTIN], { headers });

        const globalGepir = response.data;
        console.log(globalGepir);
        console.log(globalGepir);
        console.log(globalGepir[0].countryOfSaleCode);
        console.log(globalGepir[0].countryOfSaleCode?.numeric);
        // if globalGepir[0].countryOfSaleCode?.numeric exist then user it to fecht name from country_of_sales
        let countryOfSale = '';
        console.log(globalGepir[0].countryOfSaleCode?.[0]?.numeric);
        if (globalGepir[0].countryOfSaleCode?.[0]?.numeric) {
            countryOfSale = await prisma.country_of_sales.findFirst({
                where: {
                    country_code_numeric3: globalGepir[0].countryOfSaleCode?.[0]?.numeric
                }
            });
            console.log(countryOfSale);

        }

        let countryOfSaleName = countryOfSale?.country_name ?? '';

        if (globalGepir.length > 0 && !globalGepir[0]['validationErrors']) {
            // Ensure that globalGepir[0] and other required properties are defined before accessing them

            // You can fetch productContents and other data here as needed
            const productContents = await gs1dlPrisma.tblProductContents.findMany({
                where: {
                    GTIN: barcode,
                },
            });


            const firstEntry = globalGepir[0];
            const globalGepirArr = {
                gtin: firstEntry.gtin ?? '',
                companyName: firstEntry.licenseeName ?? '',
                gpcCategoryCode: firstEntry.gpcCategoryCode ?? '',
                brandName: firstEntry.brandName && firstEntry.brandName[0] ? firstEntry.brandName[0].value : '',
                productDescription: firstEntry.productDescription && firstEntry.productDescription[0] ? firstEntry.productDescription[0].value : '',
                productImageUrl: firstEntry.productImageUrl && firstEntry.productImageUrl[0] ? firstEntry.productImageUrl[0].value : '',
                unitCode: firstEntry.netContent && firstEntry.netContent[0] ? firstEntry.netContent[0].unitCode : '',
                unitValue: firstEntry.netContent && firstEntry.netContent[0] ? firstEntry.netContent[0].value : '',
                countryOfSaleCode: firstEntry.countryOfSaleCode && firstEntry.countryOfSaleCode[0] ? firstEntry.countryOfSaleCode[0].alpha3 : '',
                productName: firstEntry.productDescription && firstEntry.productDescription[0] ? firstEntry.productDescription[0].value : '',
                moName: firstEntry.gs1Licence && firstEntry.gs1Licence.licensingMO ? firstEntry.gs1Licence.licensingMO.moName : '',
                licenceKey: firstEntry?.gs1Licence?.licenceKey ?? '',
                licenceType: firstEntry.gs1Licence?.licenceType ?? '',
                type: 'gepir',
                countryOfSaleName: countryOfSaleName,
                gcpGLNID: firstEntry.gs1Licence && firstEntry.gs1Licence.licenseeGLN ? firstEntry.gs1Licence.licenseeGLN : '',
            };

            return res.status(200).json({ globalGepirArr, productContents });
        } else {
            // Handle the case when there are validation errors or the product is not found
            throw createError(404, globalGepir[0]?.validationErrors[0]?.errors[0]?.message ?? 'Product not found');
        }
    } catch (error) {
        console.log(error);
        console.log(error[0]?.validationErrors);
        next(error);
    }
};





const foreignGtinsSchema = Joi.object({
    BrandName: Joi.string().max(255).required(),
    productnameenglish: Joi.string().max(255).required(),
    moName: Joi.string().max(255),
    barcode: Joi.string().max(50).required(),
    details_page: Joi.string().max(255),
    unit: Joi.string().max(50),
    front_image: Joi.string().max(255),
    gpc: Joi.string().max(255),
    gpc_code: Joi.string().max(255),
    size: Joi.string().max(255),
    countrySale: Joi.string().max(255),
    user_id: Joi.string(),
    admin_id: Joi.string(),
    companyId: Joi.string(),
});

export const createForeignGtins = async (req, res, next) => {
    try {
        const { error } = foreignGtinsSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const createdForeignGtins = await prisma.foreign_gtins.create({
            data: req.body,
        });

        res.status(201).json(createdForeignGtins);
    } catch (error) {
        next(error);
    }
};




export const getForeignGtins = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            id: Joi.string(),
            BrandName: Joi.string(),
            productnameenglish: Joi.string(),
            moName: Joi.string(),
            barcode: Joi.string(),
            details_page: Joi.string(),
            unit: Joi.string(),
            front_image: Joi.string(),
            gpc: Joi.string(),
            gpc_code: Joi.string(),
            size: Joi.string(),
            countrySale: Joi.string(),
            user_id: Joi.string(),
            admin_id: Joi.string(),
            companyId: Joi.string(),
            created_at: Joi.date(),
            updated_at: Joi.date(),
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

        // Check if any filter conditions are provided
        const hasFilterConditions = Object.keys(value).length > 0;

        // Construct filter conditions for Prisma query
        const filterConditions = hasFilterConditions
            ? Object.keys(value).reduce((obj, key) => {
                obj[key] = value[key];
                return obj;
            }, {})
            : {};

        // Fetch foreign_gtins based on filter conditions
        const foreignGtins = await prisma.foreign_gtins.findMany({
            where: filterConditions,
            orderBy: { created_at: 'desc' }, // Adjust the sorting as needed
        });

        return res.json(foreignGtins);
    } catch (error) {
        console.error(error);
        next(error);
    }
};



const foreignGtinsUpdateSchema = Joi.object({
    BrandName: Joi.string().max(255),
    productnameenglish: Joi.string().max(255),
    moName: Joi.string().max(255),
    barcode: Joi.string().max(50).required(),
    details_page: Joi.string().max(255),
    unit: Joi.string().max(50),
    front_image: Joi.string().max(255),
    gpc: Joi.string().max(255),
    gpc_code: Joi.string().max(255),
    size: Joi.string().max(255),
    countrySale: Joi.string().max(255),
    user_id: Joi.string(),
    admin_id: Joi.string(),
    companyId: Joi.string(),
});


export const updateForeignGtins = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error: idError } = schema.validate(req.params);
        if (idError) {
            return next(createError(400, idError.details[0].message));
        }

        const { id } = req.params;

        const { error } = foreignGtinsUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const updatedForeignGtins = await prisma.foreign_gtins.update({
            where: { id: id },
            data: req.body,
        });

        res.json(updatedForeignGtins);
    } catch (error) {
        next(error);
    }
};

export const deleteForeignGtins = async (req, res, next) => {
    try {
        const schema = Joi.object({
            id: Joi.string().required(),
        });
        const { error } = schema.validate(req.params);
        if (error) {
            return next(createError(400, error.details[0].message));
        }

        const { id } = req.params;

        await prisma.foreign_gtins.delete({
            where: { id: id },
        });

        res.json({ message: 'Foreign GTIN deleted successfully' });
    } catch (error) {
        next(error);
    }
};



export const searchGTINwithMap = async (req, res, next) => {
    try {
        let gtinInformation = '';
        let serialBatches = [];
        let serials = [];
        let batches = []; // Define batches variable here

        if (req.query.gtin) {
            gtinInformation = await wtracePrisma.tblGLNTagIDEvents.findMany({
                where: { ItemRefNo: req.query.gtin },
            });

            serialBatches = await gs1dlPrisma.tblProductContents.findMany({
                where: { GTIN: req.query.gtin },
                select: { Batch: true, Serial: true },
            });

            batches = [...new Set(serialBatches.map(item => item.Batch))]; // Assign batches here
            serials = [...new Set(serialBatches.map(item => item.Serial))];
        }

        gtinInformation.sort((a, b) => new Date(a.TrxDateLastUpdate) - new Date(b.TrxDateLastUpdate));

        if (gtinInformation.length > 0) {
            let getLatLong = [];

            if (req.query.batch) {
                getLatLong = await ifBatch(req.query);
            } else if (req.query.serial) {
                getLatLong = await ifSerial(req.query);
            } else {
                getLatLong = await normalSearch(req.query);
            }

            getLatLong.sort((a, b) => new Date(a.TrxDateLastUpdate) - new Date(b.TrxDateLastUpdate));

            const eventLocations = getLatLong.map(value => ({
                latitude: value.ItemGPSOnGoLat,
                longitude: value.ItemGPSOnGoLon,
                name: value.TrxEventId,
                description: value.TrxEventDescription,
                locationName: '', // Add logic to fetch locationName from user table
                serial: value.Serial,
                type: 'event',
            }));

            const brandOwnerMarkerDetails = await brandOwnerMarkers(req.query);
            const locations = [...eventLocations, ...brandOwnerMarkerDetails];

            const googleMap = {
                locations,
                initialSerial: req.query.initalSerial,
            };

            return res.status(200).json({
                gtinInformation,
                googleMap,
                orderBySerial: [...serials],
                orderByBatch: [...batches],
            });
        } else {
            return res.status(404).json({ message: 'GTIN not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

