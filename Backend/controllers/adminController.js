import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';
import bcrypt from 'bcryptjs';

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
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = bcrypt.compare(password, adminUser.password);

        if (!passwordMatch) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        // You can generate and return an authentication token (JWT) here if needed
        delete adminUser.password;
        return res.status(200).json({ message: 'Login successful', adminUserData: adminUser});
    } catch (error) {
        next(error);
    } finally {
        await prisma.$disconnect();
    }
};
