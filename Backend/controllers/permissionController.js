import prisma from '../prismaClient.js';
import Joi from 'joi';

const permissionSchema = Joi.object({
    name: Joi.string().max(255).required(),
    // Add other validation rules if necessary
});

export const createPermission = async (req, res, next) => {
    try {
        const { error } = permissionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name } = req.body;

        const createdPermission = await prisma.permission.create({
            data: {
                name,
            },
        });
        res.status(201).json(createdPermission);
    } catch (error) {
        next(error);
    }
};

export const createBulkPermissions = async (req, res, next) => {
    try {
        const permissions = req.body.permissions; // An array of permission objects
        const validationErrors = [];

        for (const item of permissions) {
            if (typeof item.name !== 'string') {
                validationErrors.push({
                    permissionName: item.name,
                    error: `"name" must be a string`,
                });
            }
            // You can add further validation here if needed.
        }

        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }

        // Check for duplicates by querying the database for existing permissions
        const existingPermissions = await prisma.permission.findMany({
            where: {
                name: {
                    in: permissions.map((item) => item.name),
                },
            },
        });

        // Filter out permissions that already exist
        const newPermissions = permissions.filter((item) =>
            existingPermissions.every((existingPermission) => existingPermission.name !== item.name)
        );

        if (newPermissions.length === 0) {
            return res.status(400).json({ error: "All permissions already exist." });
        }

        // Insert the new permissions into the database
        const createdPermissions = await prisma.permission.createMany({
            data: newPermissions.map((item) => ({
                name: item.name,
            })),
        });

        res.status(201).json(createdPermissions);
    } catch (error) {
        next(error);
    }
};



export const getAllPermissions = async (req, res, next) => {
    try {
        const permissions = await prisma.permission.findMany();
        res.json(permissions);
    } catch (error) {
        next(error);
    }
};

export const updatePermission = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = permissionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name } = req.body;
        const updatedPermission = await prisma.permission.update({
            where: { id },
            data: {
                name,
            },
        });
        res.json(updatedPermission);
    } catch (error) {
        next(error);
    }
};

export const deletePermission = async (req, res, next) => {
    try {
        const { id } = req.params;
        await prisma.permission.delete({
            where: { id },
        });
        res.json({ message: 'Permission deleted successfully' });
    } catch (error) {
        next(error);
    }
};
