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
        const roles = await prisma.role.findMany({
            // include: {
            //     permissions: {
            //         include: {
            //             permission: true // This includes the Permission details in each RolePermission entry
            //         }
            //     },
            //     // admins: true // Includes related admins if needed
            // }
        });

        if (!roles || roles.length === 0) {
            throw createError(404, 'Roles not found');
        }


        res.json(roles);
    } catch (error) {
        next(error);
    }
};


// Joi schema for role ID validation
const roleIdSchema = Joi.string().required();
export const getRole = async (req, res, next) => {
    try {
        // Validate the role ID
        const { error } = roleIdSchema.validate(req.params.id);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id } = req.params;

        // Fetch the role with associated permissions
        const role = await prisma.role.findUnique({
            where: { id },
            include: {
                permissions: {
                    include: {
                        permission: true
                    }
                }
            }
        });

        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Optionally transform the role data structure
        const transformedRole = {
            ...role,
            permissions: role.permissions.map(rp => rp.permission) // Flatten permissions array
        };

        res.json(transformedRole);
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




// assign roles to admin

// Joi schema for adminId and roleId validation
const adminRoleIdSchema = Joi.object({
    adminId: Joi.string().required(),
    roleId: Joi.string().required(),
});

export const assignRoleToAdmin = async (req, res, next) => {
    try {
        // Validate adminId and roleId
        const { error, value } = adminRoleIdSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { adminId, roleId } = value;

        // Check if the admin and role exist
        const admin = await prisma.admins.findUnique({
            where: { id: adminId },
        });

        const role = await prisma.role.findUnique({
            where: { id: roleId },
        });

        if (!admin || !role) {
            return res.status(404).json({ message: 'Admin or Role not found' });
        }

        // Check if the admin already has the role
        const existingAdminRole = await prisma.adminRole.findFirst({
            where: {
                adminId,
                roleId,
            },
        });

        if (existingAdminRole) {
            return res.status(400).json({ message: 'Admin already has this role' });
        }

        // Assign the role to the admin
        await prisma.adminRole.create({
            data: {
                adminId,
                roleId,
            },
        });

        res.json({ message: 'Role assigned to admin successfully' });
    } catch (error) {
        next(error);
    }
};





export const getRolesAssignedToAdmin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            adminId: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.query);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { adminId } = value;

        // Find the admin with assigned roles, including the role data
        const adminWithRoles = await prisma.admins.findUnique({
            where: { id: adminId },
            include: {
                roles: {
                    include: {
                        role: true,  // Include the actual role data
                    }
                }
            }
        });

        if (!adminWithRoles) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Extract the roles assigned to the admin along with the role data
        const rolesAssignedToAdmin = adminWithRoles.roles.map(adminRole => adminRole.role);

        res.json(rolesAssignedToAdmin);
    } catch (error) {
        next(error);
    }
};



// Controller for deleting a role assigned to an admin
export const deleteRoleAssignedToAdmin = async (req, res, next) => {
    try {
        const schema = Joi.object({
            adminId: Joi.string().required(),
            roleId: Joi.string().required(),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw createError(400, error.details[0].message);
        }

        const { adminId, roleId } = value;

        // Check if the admin and role exist
        const admin = await prisma.admins.findUnique({
            where: { id: adminId },
        });

        const role = await prisma.role.findUnique({
            where: { id: roleId },
        });

        if (!admin || !role) {
            return res.status(404).json({ message: 'Admin or Role not found' });
        }

        // Check if the admin has the role
        const existingAdminRole = await prisma.adminRole.findFirst({
            where: {
                adminId,
                roleId,
            },
        });

        if (!existingAdminRole) {
            return res.status(400).json({ message: 'Admin does not have this role' });
        }

        // Delete the role assigned to the admin
        await prisma.adminRole.delete({
            where: {
                adminId_roleId: {
                    adminId,
                    roleId,
                }
            }
        });

        res.json({ message: 'Role assigned to admin deleted successfully' });
    } catch (error) {
        console.log(error);
        next(error);
    }
};


