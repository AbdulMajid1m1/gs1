import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import axios from 'axios';


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
            // licenceKey: product.user?.gcpInformation?.key_pk,
            // licenceType: product.user?.gcpInformation?.type_pk,
            moName: 'GS1 SAUDI ARABIA',
            type: 'local',
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

        if (!globalGepir[0]['validationErrors']) {
            // Construct response object if there are no validation errors
            const globalGepirArr = {
                gtin: globalGepir[0]['gtin'] ?? '',
                companyName: globalGepir[0]['licenseeName'] ?? '',
                gpcCategoryCode: globalGepir[0]['gpcCategoryCode'] ?? '',
                brandName: globalGepir[0]['brandName'][0]['value'] ?? '',
                productDescription: globalGepir[0]['productDescription'][0]['value'] ?? '',
                productImageUrl: globalGepir[0]['productImageUrl'][0]['value'] ?? '', // Handle default image if needed
                unitCode: globalGepir[0]['netContent'][0]['unitCode'] ?? '',
                unitValue: globalGepir[0]['netContent'][0]['value'] ?? '',
                countryOfSaleCode: globalGepir[0]['countryOfSaleCode'][0]['alpha3'] ?? '',
                productName: globalGepir[0]['productDescription'][0]['value'] ?? '',
                // licenceKey: globalGepir[0]['gs1Licence']['licenceKey'] ?? '',
                // licenceType: globalGepir[0]['gs1Licence']['licenceType'] ?? '',
                moName: globalGepir[0]['gs1Licence']['licensingMO']['moName'] ?? '',
                type: 'gepir',
            };

            res.status(200).json(globalGepirArr);
        } else {
            // Handle the case when there are validation errors or the product is not found
            res.status(404).json({ message: "Product not found in the global database." });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};
