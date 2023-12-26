// memberHistoryLogsController.js
import prisma from '../prismaClient.js';
import Joi from 'joi';

export const getMemberHistoryLogs = async (req, res, next) => {
    try {
        // Define allowable columns for filtering
        const allowedColumns = {
            member_id: Joi.string(),
            admin_id: Joi.string(),
            user_id: Joi.string(),
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
            return res.status(400).send(`Invalid query parameter: ${error.details[0].message}`);
        }

        // Construct filter conditions for Prisma query
        const filterConditions = Object.keys(value).length > 0
            ? Object.fromEntries(
                Object.entries(value).map(([key, val]) => [key, { equals: val }])
            )
            : {};

        // Fetch member history logs from the database
        const memberHistoryLogs = await prisma.member_history_logs.findMany({
            where: filterConditions,

            orderBy: { created_at: 'desc' }, // Ordering by the creation date
            include: {
                user: true,

            },
        });

        // Return the fetched logs
        res.json(memberHistoryLogs);
    } catch (error) {
        console.error('Error fetching member history logs:', error);
        next(error);
    }
};
