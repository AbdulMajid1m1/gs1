import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';






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
                admin: true,
            },
        });

        const otherProductHistories = await prisma.other_products_subscription_histories.findMany({
            where: dateRangeCondition,
            include: {
                user: true,
                product: true,
                admin: true,

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

export const getAllAdminsActivityReport = async (req, res, next) => {
    try {
        // Validate start and end dates using Joi
        const { error, value } = Joi.object({
            startDate: Joi.date().iso().required(),
            endDate: Joi.date().iso().required(),
        }).validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { startDate, endDate } = value;

        // Fetch activities of all admins within the date range
        const activities = await prisma.admin_history_logs.findMany({
            where: {
                created_at: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                },
            },
            include: {
                admin: true, // Assuming 'admin' is a relation to the admin data
            }
        });

        return res.json(activities);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const getAdminActivityReport = async (req, res, next) => {
    try {
        // Validate start and end dates using Joi
        const { error, value } = Joi.object({
            startDate: dateSchema.required(),
            endDate: dateSchema.required(),
            admin_id: Joi.number().required(),

        }).validate(req.body); // Use req.body instead of req.query

        if (error) {
            throw createError(400, error.details[0].message);
        }



        // Extract and validate start and end dates
        const { startDate, endDate } = value;

        // Construct date range conditions for Prisma query
        const data = {
            created_at: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        };

        // Fetch data from both tables
        const adminHistories = await prisma.admin_history_logs.findMany({
            where: data,
            include: {
                admin: true,
                user: true,

            }
        });


        return res.json(adminHistories);
    }
    catch (error) {
        console.log(error);
        next(error);
    }

}
export const getMemberActivityReport = async (req, res, next) => {
    try {
        // Validate start and end dates using Joi
        const { error, value } = Joi.object({
            startDate: dateSchema.required(),
            endDate: dateSchema.required(),
            userId: Joi.string().required(),
        }).validate(req.body); // Use req.body instead of req.query

        if (error) {
            throw createError(400, error.details[0].message);
        }



        // Extract and validate start and end dates
        const { startDate, endDate } = value;
        console.log(startDate, endDate);
        // Construct date range conditions for Prisma query
        const data = {
            created_at: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        };

        // Fetch data from both tables
        const memberHistories = await prisma.member_history_logs.findMany({
            where: data,
            include: {
                user: true,

            }
        });


        return res.json(memberHistories);
    }
    catch (error) {
        console.log(error);
        next(error);
    }

}

