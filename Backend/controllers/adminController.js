import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_JWT_SECRET, JWT_EXPIRATION } from '../configs/envConfig.js';
import { cookieOptions } from '../utils/authUtilities.js';
import { sendEmail } from '../services/emailTemplates.js';


export const adminLogin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { email, password } = value;

        // Check if the admin user exists
        const adminUser = await prisma.admins.findFirst({
            where: { email, status: 1 },
        });

        if (!adminUser) {
            throw createError(404, 'Invalid Credentials');
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcrypt.compare(password, adminUser.password);

        if (!passwordMatch) {
            throw createError(404, 'Invalid Credentials');
        }

        // You can generate and return an authentication token (JWT) here if needed
        delete adminUser.password;
        const token = jwt.sign({ adminId: adminUser.id, email: adminUser.email, is_super_admin: adminUser.is_super_admin, username: adminUser.username }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        return res.cookie("adminToken", token, cookieOptions()).status(200).json({ success: true, adminData: adminUser, token });
    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};


// Define the controller function for searching admins
export const searchAdmins = async (req, res, next) => {
    try {
        const { keyword } = req.query; // Get the search keyword from the query parameters
        if (!keyword) {
            throw createError(400, 'Keyword is required');
        }

        // Define the searchable columns for admins
        const searchableColumns = [
            'username',
            'email',
            'mobile',
            // Add more columns as needed
        ];

        // Construct the search conditions for Prisma query
        const searchConditions = {
            OR: searchableColumns.map(column => ({
                [column]: {
                    contains: keyword.toLowerCase(), // Convert keyword to lowercase
                },
            })),
        };

        // Fetch the top 30 latest admin records that match the search conditions
        const admins = await prisma.admins.findMany({
            where: searchConditions,
            orderBy: { created_at: 'desc' }, // Sort by created_at in descending order
            take: 30, // Limit to 30 records
        });

        return res.json(admins);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// Controller function to assign admin to user
// Controller function to assign admin to user and send an email notification
export const assignAdminToUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            adminId: Joi.string().required(),
            userId: Joi.string().required(),
            message: Joi.string().optional(),
            assigningAdminName: Joi.string().optional(),

        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { adminId, userId, message } = value;

        // Check if both admin and user exist
        const adminExists = await prisma.admins.findUnique({
            where: { id: adminId },
        });
        const userExists = await prisma.users.findUnique({
            where: { id: userId },
        });

        if (!adminExists || !userExists) {
            throw createError(404, 'Admin or user not found.');
        }

        // Check if the user is already assigned an admin
        const user = await prisma.users.findUnique({
            where: { id: userId },
            include: { assign_to_admin: true }, // Include the assigned admin
        });

        if (user.assign_to_admin) {
            throw createError(400, `User is already assigned to ${user.assign_to_admin.username}.`);
        }

        // Assign the admin to the user
        await prisma.users.update({
            where: { id: userId },
            data: {
                assign_to: adminId,
            },
        });

        // Send an email to the admin with the provided message and user details

        const adminEmail = adminExists.email;
        const emailSubject = 'GS1Ksa Assignment Notification';
        let emailContent = `
                <html>
                <head>
                    <title>GS1Ksa Assignment Notification</title>
                </head>
                <body>
                    <h1>GS1Ksa Assignment Notification</h1>
                    <p>Hello ${adminExists.username},</p>
                    <p>You have been assigned to a user in the system. Here are the details:</p>
                    <ul>
                        ${user.companyID ? `<li>User ID: ${user.companyID}</li>` : ''}
                        <li>User Company Name: ${user.company_name_eng}</li>
                    </ul>
                </body>
                </html>
            `;

        if (message && value.assigningAdminName) {
            emailContent += `<p>Message from the assigning Admin ${value.assigningAdminName}: ${message}</p>`;
        }

        emailContent += `
                    <p>Thank you for your assistance.</p>
                    <p>Best regards,<br>GS1Ksa Team</p>
                </body>
                </html>
            `;

        // Use your sendEmail function to send the email
        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: adminEmail,
            subject: emailSubject,
            htmlContent: emailContent,
        });


        res.status(200).json({ message: 'Admin assigned to user successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};




// Controller function to add admin user
// Define the validation schema for admin data
const adminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    mobile: Joi.string().required(),

    isSuperAdmin: Joi.boolean().optional().default(false),
});

export const addAdmin = async (req, res, next) => {
    try {


        const { error, value } = adminSchema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { email, password, username, mobile, isSuperAdmin } = value;




        // Check if the admin user already exists with the same email
        const existingAdmin = await prisma.admins.findFirst({
            where: { email },
        });

        if (existingAdmin) {
            return next(createError(400, 'Admin with this email already exists.'));
        }

        // Hash the password before saving it
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // save 0 or 1 in the database based on the isSuperAdmin value
        const status = value.isSuperAdmin ? 1 : 0;
        // Create the admin user in the database
        const newAdmin = await prisma.admins.create({
            data: {
                email,
                password: hashedPassword,
                username,
                mobile,
                is_super_admin: status,
            },
        });


        res.status(201).json({ message: 'Admin user created successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};