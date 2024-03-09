//-------------------arabic---------------------------------------
import { promisify } from 'util';
import fs from 'fs';
import Joi from 'joi';
import prisma from '../prismaClient.js';
import
{
    createError
} from '../utils/createError.js';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const languageSchema = Joi.object({
    type: Joi.string().max(255),
    key: Joi.string().max(255).required(),
    value: Joi.string().required(),


});
const jsonFilePath = './arabic.json';

// app.get('/translations', async
export const translations = async (req, res, next) =>
{
    try {
        const AllUNSPSC = await prisma.languages.findMany();

        // Create an empty object to store the formatted data
        let formattedData = {};

        // Loop through the data and populate the formatted object
        AllUNSPSC.forEach(item =>
        {
            formattedData[item.key] = item.value;
        });

        res.json(formattedData);
    } catch (error) {
        next(error);
    }
};
// app.get('/translations_table', async
export const translations_table = async (req, res, next) =>
{
    try {
        const AllUNSPSC = await prisma.languages.findMany();


        res.json(AllUNSPSC);
    } catch (error) {
        next(error);
    }
};
// app.put('/translations/:id',
export const translations_put = async (req, res, next) =>
{
    try {
        const languageSchema = Joi.object({
            value: Joi.string().required(),
        });

        const schema = Joi.object({
            id: Joi.string().required(),
        });

        const {
            error: idError
        } = schema.validate(req.params);
        if (idError) {
            throw createError(400, idError.details[0].message);
        }

        const {
            id
        } = req.params;

        const {
            error: validationError
        } = languageSchema.validate(req.body);
        if (validationError) {
            throw createError(400, validationError.details[0].message);
        }

        const {
            value
        } = req.body;
        const updatedTranslation = await prisma.languages.update({
            where: {
                id: id, // Assuming "key" is the correct field to identify the record
            },
            data: {
                value: value,
            },
        });

        res.json(updatedTranslation);
    } catch (error) {
        next(error);
    }
};

// app.get('/convert', async (req, res, next) =>
// {
//     try {
//         // Read the JSON file
//         fs.readFile(jsonFilePath, 'utf8', async (err, data) =>
//         {
//             if (err) {
//                 console.error('Error reading file:', err);
//                 return res.status(500).send('Error reading file');
//             }

//             try {
//                 // Parse JSON data to JavaScript object
//                 const languageObject = JSON.parse(data);

//                 // Convert object to array of key-value pairs
//                 const languages = Object.entries(languageObject);

//                 for (const [key, value] of languages) {
//                     await prisma.languages.create({
//                         data: {
//                             key,
//                             value,
//                         },
//                     });
//                     console.log(`Created language with key: ${key}`);
//                 }
//                 res.status(200).send('Languages inserted successfully');
//             } catch (error) {
//                 console.error('Error parsing JSON:', error);
//                 res.status(500).send('Error parsing JSON');
//             } finally {
//                 await prisma.$disconnect();
//             }
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.post('/translations',
export const translations_post = async (req, res, next) =>
{
    try {
        const {
            error,
            value
        } = languageSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        const unit = await prisma.languages.create({
            data: value,
        });
        res.status(201).json(unit);
    } catch (error) {
        next(error);
    }
};