import axios from "axios";
import prisma from "../../prismaClient.js";
import { imageLiveUrl } from "../utils.js";
import https from 'https';
import { GLOBAL_API_BASE_URL_DEV, GLOBAL_GEPIR_DEV_API_KEY, GLOBAL_GEPIR_PROD_API_KEY } from "../../configs/envConfig.js";


export async function checkMultipleGtinData(barcodeList) {
    // Retrieve all products with barcodes in the barcodeList
    const products = await prisma.products.findMany({
        where: {
            barcode: { in: barcodeList }
        },
        select: {
            barcode: true,
            // front_image: true,
            // back_image: true,
            // BrandName: true,
            // BrandNameAr: true,
            // size: true,
            // Origin: true,
            // countrySale: true,
            // ProductType: true,
            // gpc_code: true,
            // details_page: true,
            // details_page_ar: true,
        }
    });

    // Initialize a Set of ready barcodes
    const readyBarcodes = new Set(barcodeList);

    // Loop through each product and remove its barcode from readyBarcodes if any column is missing
    products.forEach(product => {
        for (const [key, value] of Object.entries(product)) {
            if (!value || value === '') {
                readyBarcodes.delete(product.barcode);
                break; // No need to check further fields for this product
            }
        }
    });
    console.log("readyBarcodes", readyBarcodes);
    // Convert the Set back to an array
    return Array.from(readyBarcodes);
}



export async function checkGtinData(barcode) {
    const columns = [
        'front_image', 'back_image', 'BrandName', 'BrandNameAr', 'size',
        'Origin', 'countrySale', 'ProductType', 'gpc_code', 'details_page', 'details_page_ar'
    ];

    // This flag tracks if all required fields are non-null and non-empty.
    let allFieldsComplete = true;

    // Sequentially check each field for non-null and non-empty values.
    for (const column of columns) {
        const record = await prisma.products.findFirst({
            where: {
                barcode,
                AND: [
                    { NOT: { [column]: null } },
                    { NOT: { [column]: '' } },
                ],
            },
        });

        // If no record is found, it means this field is either null or empty for all records with this barcode.
        if (!record) {
            allFieldsComplete = false;
            break; // Break early since we found an incomplete field.
        }
    }
    console.log("allFieldsComplete", allFieldsComplete);
    // If all fields are complete, return true; otherwise, return false.
    return allFieldsComplete;
}
//  TODO: change api key to production key
export async function sendProductsToGepir(request) {
    const currentDate = new Date().toISOString();
    const productIDs = request.ids; // Assuming this is how you're receiving the IDs

    const userLastImport = await prisma.products.findMany({
        where: { id: { in: productIDs } },
    });

    const userLastImportChunk = chunkArray(userLastImport, 1000);

    for (let chunk of userLastImportChunk) {
        for (let row of chunk) {
            const user = await prisma.users.findUnique({
                where: { id: row.user_id },
                select: { id: true, gcpGLNID: true, gcp_type: true }
            });

            const gtinStatus = row.status === '0' ? 'INACTIVE' : 'ACTIVE';
            const gtins = '0' + row.barcode;
            const body = {
                gtin: gtins,
                gtinStatus: gtinStatus,
                gpcCategoryCode: row.gpc_code,
                licenceKey: user.gcpGLNID,
                licenceType: user.gcp_type || 'GCP',
                brandName: [{ language: row.prod_lang, value: row.BrandName }],
                productDescription: [{ language: row.prod_lang, value: row.productnameenglish }],
                productImageUrl: [{ language: row.prod_lang, value: `${imageLiveUrl(row.front_image) || 'No Value'}` }],
                netContent: [{ unitCode: row.unit, value: row.size }],
                countryOfSaleCode: [row.countrySale],
            };

            try {
                // const response = await axios.post('https://grp.gs1.org/grp/v3/gtins', [body], {
                const response = await axios.post(`${GLOBAL_API_BASE_URL_DEV}/gtins`, [body], {
                    // headers: { 'APIKey': 'a54f5b6535994ffeb88b575198faac11' },
                    headers: { 'APIKey': GLOBAL_GEPIR_DEV_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                });
                const globalGepir = response.data;
                console.log("globalGepir", globalGepir);

                // const feedbackResponse = await axios.get(`https://grp.gs1.org/grp/v3/feedback/${globalGepir}`, {
                const feedbackResponse = await axios.get(`${GLOBAL_API_BASE_URL_DEV}/feedback/${globalGepir}`, {
                    // headers: { 'APIKey': 'a54f5b6535994ffeb88b575198faac11' },
                    headers: { 'APIKey': GLOBAL_GEPIR_DEV_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                });
                const feedbackGepir = feedbackResponse.data;

                if (feedbackGepir[0] && feedbackGepir[0].validationErrors) {
                    console.log("feedbackGepir[0].validationErrors");
                    console.log(feedbackGepir[0].validationErrors);
                } else {
                    await prisma.products.update({
                        where: { barcode: row.barcode },
                        data: { gepirPosted: 1 },
                    });


                }
            } catch (error) {
                console.error(error);
            }
        }
    }
}

function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}


export async function sendLicenceToGepir(userIds) {
   

    const users = await prisma.users.findMany({
        where: {
            id: {
                in: userIds,
            },
        },
    });

    // Assuming a function to chunk array into smaller arrays of size 1000
    const userChunks = chunkArray(users, 1000);

    for (const chunk of userChunks) {
        for (const user of chunk) {

            // based on user.country code, get the country code from the countries table
            // const country = await prisma.country_of_sales.findFirst({
            //     where: {
            //         country_name: user.country
            //     }
            // });
            // console.log("country", country);

            // Assuming 'status', 'companyName', and 'licenseeGln' fields are correctly represented in the users table or somehow derived
            const body = {
                licenceKey: user.gcpGLNID,
                licenceType: user.gcp_type || 'GCP',
                licenceStatus: 'ACTIVE', // Assuming you have a way to derive ACTIVE/INACTIVE status
                licenseeName: user.company_name_eng,
                licenseeGLN: user.gln,
                contactPoint: [{
                    email: user.email,
                    telephone: user.mobile,
                    website: user.website,
                }],
                address: {
                    // streetAddress: { language: "en", value: user.location_uk },
                    // addressLocality: { language: "en", value: user.city },
                    ...(user.city && { addressLocality: { language: "en", value: user.city } }),
                    ...(user.state && { addressRegion: { language: "en", value: user.state } }),                    // countryCode: country.country_code_numeric3,
                    // countryCode: '364',
                    // postalName: { language: "en", value: user.district },
                    // streetAddressLine2: { language: "en", value: '' }, 
                    // postOfficeBoxNumber: user.po_box,
                    // crossStreet: { language: "en", value: '' }, // Assuming a value or handling its absence
                    // addressSuburb: { language: "en", value: user.district },
                    //     if(user.state)
                    //     addressRegion: { language: "en", value: user.state }
                    // },
                    postalCode: user.zip_code,
                },
            };

            try {
                // const response = await axios.post('https://grp.gs1.org/grp/v3/licences', body, {
                const response = await axios.post(`${GLOBAL_API_BASE_URL_DEV}/licences`, [body], {
                    // headers: { 'APIKey': 'a54f5b6535994ffeb88b575198faac11' },
                    headers: { 'APIKey': GLOBAL_GEPIR_DEV_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Not recommended for production
                });
                console.log('Licence posted:', response.data);
                const feedbackResponse = await axios.get(`${GLOBAL_API_BASE_URL_DEV}/feedback/${response.data}`, {
                    // headers: { 'APIKey': GLOBAL_GEPIR_PROD_API_KEY },
                    headers: { 'APIKey': GLOBAL_GEPIR_DEV_API_KEY },
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Not recommended for production
                });

                if (feedbackResponse.data[0] && feedbackResponse.data[0].validationErrors) {

                    console.error('Validation errors:');
                    feedbackResponse.data[0].validationErrors.forEach(error => {
                        console.error('Property:', error.property);
                        console.error('Errors:', error.errors);
                    });
                    return { success: false, error: feedbackResponse.data[0].validationErrors };
                } else {

                    const updatedUser = await prisma.users.update({
                        where: { id: user.id },
                        data: { gepirPosted: 1 },
                    });
                    return { success: true, updatedUser };
                }
            } catch (error) {
                console.error('Error posting licence or fetching feedback:', error.message);
                return { success: false, error: error.message };
            }
        }
    }
}
