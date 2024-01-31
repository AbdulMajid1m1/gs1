import prisma from '../prismaClient.js';
import Joi from 'joi';
import { createError } from '../utils/createError.js';


const createRoleSchema = Joi.object({
    name: Joi.string().max(255).required(),
    permissions: Joi.array().items(Joi.string().max(255)), // You can specify the validation for permission IDs here if needed.
});

export const createRole = async (req, res, next) => {
    try {
        const { error, value } = createRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, permissions } = value; // permissions is an array of permission IDs


        const createdRole = await prisma.role.create({
            data: { name },
        });

        // Assign permissions to the role if they are provided
        if (permissions && permissions.length) {
            const rolePermissionsData = permissions.map(permissionId => ({
                roleId: createdRole.id,
                permissionId,
            }));

            await prisma.rolePermission.createMany({
                data: rolePermissionsData,
            });
        }

        // Optionally, fetch the role with permissions for the response
        const roleWithPermissions = await prisma.role.findUnique({
            where: { id: createdRole.id },
            include: { permissions: true },
        });

        res.status(201).json(roleWithPermissions);
    } catch (error) {
        next(error);
    }
};



export const getRoles = async (req, res, next) => {
    try {


        const role = await prisma.role.findMany({
            include: { permissions: true },
        });

        if (!role) {
            throw createError(404, 'Roles not found');
        }

        res.json(role);
    } catch (error) {
        next(error);
    }
};


const updateRoleSchema = Joi.object({
    name: Joi.string().max(255).required(),
    permissions: Joi.array().items(Joi.string()).unique().min(1)
});

export const updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { error } = updateRoleSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { name, permissions } = req.body;

        const result = await prisma.$transaction(async (prisma) => {
            // Update role name
            const updatedRole = await prisma.role.update({
                where: { id },
                data: { name },
            });

            if (permissions) {
                // Remove all existing permissions
                await prisma.rolePermission.deleteMany({
                    where: { roleId: id },
                });

                // Add new permissions
                for (const permissionId of permissions) {
                    await prisma.rolePermission.create({
                        data: {
                            roleId: id,
                            permissionId,
                        },
                    });
                }
            }

            return updatedRole;
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
};


const deleteRoleSchema = Joi.object({
    id: Joi.string().required(),
});

export const deleteRole = async (req, res, next) => {
    try {
        const { error, value } = deleteRoleSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = value;

        // find role first
        const role = await prisma.role.findUnique({
            where: { id },
        });

        if (!role) {
            throw createError(404, 'Role not found');
        }


        // Delete role permissions first
        await prisma.rolePermission.deleteMany({
            where: { roleId: id },
        });

        // Then delete the role
        await prisma.role.delete({
            where: { id },
        });

        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        next(error);
    }
};


