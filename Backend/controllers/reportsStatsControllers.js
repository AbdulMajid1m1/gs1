import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';





// Define a Joi schema for date validation
// Define a Joi schema for date validation as strings
const dateSchema = Joi.string().isoDate();

export const getProductKpiReports = async (req, res, next) => {
    try {
        // Validate start and end dates using Joi
        const { error: dateValidationError } = Joi.object({
            startDate: dateSchema.required(),
            endDate: dateSchema.required(),
        }).validate(req.body); // Use req.body instead of req.query

        if (dateValidationError) {
            return next(createError(400, 'Invalid date format for start date or end date'));
        }

        // Extract and validate start and end dates
        const { startDate, endDate } = req.body;

        // Construct date range conditions for Prisma query
        const dateRangeCondition = {
            created_at: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        };

        // Fetch data from both tables
        const gtinHistories = await prisma.gtin_subscription_histories.findMany({
            where: dateRangeCondition,
            include: {
                user: true,
                gtin_product: true,
            },
        });

        const otherProductHistories = await prisma.other_products_subscription_histories.findMany({
            where: dateRangeCondition,
            include: {
                user: true,
                product: true,
            },
        });

        // Merge and process the results
        const combinedResults = gtinHistories.map((history) => ({
            ...history,
            productName: history.gtin_product.member_category_description,
        })).concat(
            otherProductHistories.map((history) => ({
                ...history,
                productName: history.product.product_name,
            }))
        );

        // Calculate additional fields
        const totalAmount = combinedResults.reduce((total, history) => total + history.price, 0);

        const newRegistrations = combinedResults.filter((history) => history.request_type !== 'renewal');
        const newRegistrationCount = newRegistrations.length;
        const newRegistrationAmount = newRegistrations.reduce((total, history) => total + history.price, 0);

        const renewals = combinedResults.filter((history) => history.request_type === 'renewal');
        const renewalCount = renewals.length;
        const renewalAmount = renewals.reduce((total, history) => total + history.price, 0);

        // Prepare the response object
        const response = {
            totalAmount,
            newRegistrations: {
                count: newRegistrationCount,
                amount: newRegistrationAmount,
            },
            renewals: {
                count: renewalCount,
                amount: renewalAmount,
            },
            combinedResults,
        };

        // Return the response
        return res.json(response);
    } catch (error) {
        console.error(error);
        next(createError(500, 'Server error occurred'));
    }
};