import prisma from '../prismaClient.js';
import { createError } from '../utils/createError.js';


export const getAllCrDocuments = async (req, res, next) => {
    try {
        const cr_documents = await prisma.cr_documents.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            }
        });
        res.json(cr_documents);
    } catch (error) {
        next(error);
    }
};