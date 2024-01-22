import { oldGs1Prisma } from '../prismaMultiClinets.js';
import prisma from '../prismaClient.js';
import { createError } from '../utils/createError.js';
import Joi from 'joi';


export const searchMembers = async (req, res, next) => {
    try {


        // Define the validation schema
        const schema = Joi.object({
            keyword: Joi.string().required(),
        });

        // Validate the keyword
        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { keyword } = value;

        const searchableColumns = [
            'MemberNameE',
            'MemberNameA',
            'Email',
            'GLN',
            // Add other searchable columns as needed
        ];

        const searchConditions = {
            OR: searchableColumns.map(column => ({
                [column]: {
                    contains: keyword.toLowerCase(), // Convert keyword to lowercase
                },
            })),
        };

        // Fetch the top 30 latest records that match the search conditions
        const members = await oldGs1Prisma.Member.findMany({
            where: searchConditions,
            orderBy: { CreatedDate: 'desc' }, // Sort by CreatedDate in descending order
            take: 30, // Limit to 30 records
        });

        return res.json(members);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const getMembershipHistory = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            MembershipID: Joi.number(),
            MemberID: Joi.number(),
            MembershipYear: Joi.number(),
            MembershipTypeID: Joi.number(),
            // ... define validation for other allowed columns
        };

        // Create a dynamic schema based on the allowed columns
        const filterSchema = Joi.object(
            Object.keys(allowedColumns).reduce((schema, column) => {
                schema[column] = allowedColumns[column];
                return schema;
            }, {})
        ).unknown(false);

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

        // Fetch membership history based on filter conditions
        const membershipHistory = await oldGs1Prisma.membershipHistory.findMany({
            where: filterConditions,
        });

        membershipHistory.sort((a, b) => b.MembershipYear - a.MembershipYear);
        return res.json(membershipHistory);
    } catch (error) {
        console.log(error);
        next(error);
    }
};