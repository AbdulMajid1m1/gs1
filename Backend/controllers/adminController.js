import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_JWT_SECRET, JWT_EXPIRATION } from '../configs/envConfig.js';
import { cookieOptions } from '../utils/authUtilities.js';
import { sendEmail } from '../services/emailTemplates.js';
import path from 'path';
import fs from 'fs';
// Assuming required imports like bcrypt, jwt, prisma, Joi, etc.

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

        // Check if the admin user exists and fetch roles and permissions
        const adminUser = await prisma.admins.findFirst({
            where: { email, status: 1 },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: {
                                    include: {
                                        permission: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!adminUser) {
            throw createError(404, 'Invalid Credentials');
        }

        // Compare the provided password
        const passwordMatch = await bcrypt.compare(password, adminUser.password);
        if (!passwordMatch) {
            throw createError(404, 'Invalid Credentials');
        }

        // Extract and format permissions with null checks
        let permissions = [];
        adminUser.roles?.forEach(adminRole => {
            adminRole.role?.permissions?.forEach(rolePermission => {
                if (rolePermission.permission) {
                    permissions.push(rolePermission.permission.name); // Extract the name of each permission
                }
            });
        });

        // Remove duplicates from permissions
        permissions = [...new Set(permissions)];

        // Generate authentication token
        delete adminUser.password; // Ensure password is not returned
        const token = jwt.sign(
            { adminId: adminUser.id, email: adminUser.email, is_super_admin: adminUser.is_super_admin, username: adminUser.username, permissions },
            ADMIN_JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        // Format response
        const response = {
            success: true,
            adminData: {
                ...adminUser,
                roles: undefined, // Exclude roles from the response
            },
            token,
            permissions,
        };
        //      TODO: remove set cookie here as it is not needed here, it's in setAdminCredentials
        res.cookie("adminToken", token, cookieOptions())    
        return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};


export const setAdminCredentials = async (req, res, next) => {
    try {
        // Extract the token from the request body
        const { token } = req.body;
        if (!token) {
            throw createError(400, 'Token is required');
        }

        // Verify the token
        const decodedToken = jwt.verify(token, ADMIN_JWT_SECRET);

        // Query the database to find the admin with the provided ID
        const admin = await prisma.admins.findUnique({
            where: { id: decodedToken.adminId },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!admin) {
            throw createError(404, 'Admin not found');
        }

        // Generate a new JWT token for the admin with extended permissions and information
        const adminToken = jwt.sign({
            adminId: admin.id,
            email: admin.email,
            is_super_admin: admin.is_super_admin,
            username: admin.username,
            // Include any other necessary details or permissions in the token payload
        }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        delete admin.password;

        // Set the new token in a cookie and return the admin data and new token in the response
        return res.cookie("adminToken", adminToken, cookieOptions()).status(200).json({
            success: true,
            adminData: admin,
            token: adminToken
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await prisma.admins.findMany({
            orderBy: {
                updated_at: 'desc' // Order by updated_at in descending order
            },
        });
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const getAdmin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            adminId: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { adminId } = value;

        const admin = await prisma.admins.findUnique({
            where: { id: adminId },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!admin) {
            throw createError(404, 'Admin not found.');
        }

        res.status(200).json(admin);
    } catch (error) {

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

// Validation schema for updating admin
const updateAdminSchema = Joi.object({
    email: Joi.string().email().optional(),
    username: Joi.string().optional(),
    mobile: Joi.string().optional(),
    isSuperAdmin: Joi.boolean().optional(),
    password: Joi.string().min(6).optional(),
    roleIds: Joi.array().items(Joi.string()).optional(), // New field for role IDs
});
export const updateAdmin = async (req, res, next) => {
    try {
        const { adminId } = req.params;
        // const { email, username, mobile, isSuperAdmin, password, roleIds } = req.body;

        // Validate incoming data using the schema
        const { error, value } = updateAdminSchema.validate(req.body);
        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { email, username, mobile, isSuperAdmin, password, roleIds } = value;
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
        let imagePath = null;
        if (req.files.profilePicture) {
            const profile = req.files.profilePicture[0];
            const profileName = profile.filename;
            profile.destination = profile.destination.replace('public', '');
            imagePath = path.join(profile.destination, profileName);
            if (existingAdmin.image) {
                fs.unlinkSync(path.join('public', existingAdmin.image));
                const existingFilePath = path.join('public', existingAdmin.image);
                if (fs.existsSync(existingFilePath)) {
                    fs.unlinkSync(existingFilePath);
                }
            }
        }

        // if imagePath is not null, add it to the updateData object
        if (imagePath) {
            updateData.image = imagePath;
        }
        // Update the admin user in the database
        await prisma.admins.update({
            where: { id: adminId },
            data: updateData,
        });

        // Fetch the current roles of the admin
        const currentRoles = await prisma.adminRole.findMany({
            where: { adminId },
        });

        // Extract the IDs of the current roles
        const currentRoleIds = currentRoles.map((role) => role.roleId);

        // Calculate the roles to be added and removed
        const rolesToAdd = roleIds.filter((roleId) => !currentRoleIds.includes(roleId));
        const rolesToRemove = currentRoleIds.filter((roleId) => !roleIds.includes(roleId));

        // Remove roles that need to be removed
        await prisma.adminRole.deleteMany({
            where: {
                adminId,
                roleId: {
                    in: rolesToRemove,
                },
            },
        });

        // Add roles that need to be added
        const rolesToAddData = rolesToAdd.map((roleId) => ({
            adminId,
            roleId,
        }));

        if (rolesToAddData.length > 0) {
            await prisma.adminRole.createMany({
                data: rolesToAddData,
            });
        }

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




// Admin OTP generation schema
const adminMobileCheckSchema = Joi.object({
    mobile: Joi.string().required(),
});

// Admin OTP verification schema
const otpVerifySchema = Joi.object({
    token: Joi.string().required(),
    otp: Joi.string().length(4).required(),
});



// Function to generate OTP and send it to admin's email
export const generateAdminOtp = async (req, res, next) => {
    const { error, value } = adminMobileCheckSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { mobile } = value;

    try {
        const admin = await prisma.admins.findFirst({
            where: { mobile },
        });

        if (!admin) {
            throw createError(404, 'Admin mobile number not found!');
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const token = jwt.sign({ id: admin.id, otp, isVerified: false }, ADMIN_JWT_SECRET, { expiresIn: '15m' });

        // Here you would implement sending the OTP to admin's email
        const emailSubject = `Admin OTP Verification`
        const emailContent = `
            <h1>GS1 Authenticator Admin OTP Verification</h1>
            <p>Your Verification OTP Is: <strong>${otp}</strong></p>
            `;

        console.log(admin.email); // Replace this with your email sending logic
        await sendEmail({
            fromEmail: ADMIN_EMAIL,
            toEmail: admin.email,
            subject: emailSubject,
            htmlContent: emailContent,
        });


        return res.status(200).json({ success: true, message: "OTP sent to your email", token });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// Function to verify the OTP sent to admin
export const verifyAdminOtp = async (req, res, next) => {
    try {
        const { error, value } = otpVerifySchema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { otp, token } = value;
        const decoded = jwt.verify(token, ADMIN_JWT_SECRET);

        if (decoded.otp !== otp) {
            return res.status(400).json({ success: false, error: "Wrong OTP" });
        }

        const newToken = jwt.sign({ id: decoded.id, isVerified: true }, ADMIN_JWT_SECRET, { expiresIn: '120d' });

        // Optionally fetch admin details to return with response
        const admin = await prisma.admins.findUnique({
            where: { id: decoded.id },
        });

        return res.status(200).json({ success: true, message: "OTP verified", token: newToken, admin });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, error: "Token expired" });
        } else {
            console.error(error);
            next(error);
        }
    }
};