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
        const passwordMatch = await bcrypt.compare(password, adminUser.password);
        console.log(passwordMatch);
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

export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await prisma.admins.findMany({});
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        next(error);
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






// Updated Schema with role IDs and image
const adminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    mobile: Joi.string().required(),
    isSuperAdmin: Joi.boolean().optional().default(false),
    roleIds: Joi.array().items(Joi.string()).optional() // New field for role IDs
    // Image field is not included in the schema as it will be handled separately
});

export const addAdmin = async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = adminSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { email, password, username, mobile, isSuperAdmin, roleIds } = value;

        // Check if the admin user already exists
        const existingAdmin = await prisma.admins.findFirst({
            where: { email },
        });
        if (existingAdmin) {
            return next(createError(400, 'Admin with this email already exists.'));
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Process image if uploaded
        let imagePath = null;
        if (req.files.profilePicture) {
            imagePath = req.files.profilePicture[0].path.replace('public', '');
        }




        // Create the admin user
        const newAdmin = await prisma.admins.create({
            data: {
                email,
                password: hashedPassword,
                username,
                mobile,
                is_super_admin: isSuperAdmin ? 1 : 0,
                ...(imagePath && { image: imagePath }),
            },
        });

        // Assign roles to the new admin
        if (roleIds && roleIds.length > 0) {
            const adminRoles = roleIds.map(roleId => ({
                adminId: newAdmin.id,
                roleId: roleId
            }));
            await prisma.adminRole.createMany({ data: adminRoles });
        }

        res.status(201).json({ message: 'Admin user created successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
export const updateAdmin = async (req, res, next) => {
    try {
        const { adminId } = req.params;
        const { email, username, mobile, isSuperAdmin, password } = req.body;

        // Validate incoming data
        const updateSchema = Joi.object({
            email: Joi.string().email().optional(),
            username: Joi.string().optional(),
            mobile: Joi.string().optional(),
            isSuperAdmin: Joi.boolean().optional(),
            password: Joi.string().min(6).optional(),
        });

        const { error } = updateSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        // Check if the admin user exists
        const existingAdmin = await prisma.admins.findUnique({
            where: { id: adminId },
        });

        if (!existingAdmin) {
            throw createError(404, 'Admin user not found.');
        }

        // Prepare the data to be updated
        let updateData = {};
        if (email) updateData.email = email;
        if (username) updateData.username = username;
        if (mobile) updateData.mobile = mobile;
        if (isSuperAdmin !== undefined) updateData.is_super_admin = isSuperAdmin ? 1 : 0;

        // Hash the new password if provided
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateData.password = hashedPassword;
        }

        // Update the admin user in the database
        await prisma.admins.update({
            where: { id: adminId },
            data: updateData,
        });

        res.json({ message: 'Admin user updated successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


// create delete admin controller
export const deleteAdmin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            adminId: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { adminId } = value;

        // Check if the admin user exists
        const adminUser = await prisma.admins.findFirst({
            where: { id: adminId },
        });

        if (!adminUser) {
            throw createError(404, 'Admin user not found.');
        }

        // Update or remove user references before deleting the admin
        await prisma.users.updateMany({
            where: { assign_to: adminId },
            data: { assign_to: null }, // or assign to another admin
        });

        // Now safe to delete the admin user
        await prisma.admins.delete({
            where: { id: adminId },
        });

        res.status(200).json({ message: 'Admin user deleted successfully.' });
    } catch (error) {
        console.error(error);
        next(error);
    }
}
