import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ADMIN_JWT_SECRET, JWT_EXPIRATION } from '../configs/envConfig.js';
import { cookieOptions } from '../utils/authUtilities.js';

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
        const token = jwt.sign({ adminId: adminUser.id, email: adminUser.email }, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });
        return res.cookie("adminToken", token, cookieOptions()).status(200).json({ success: true, adminData: adminUser, token });
    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};
