import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import { ADMIN_JWT_SECRET, JWT_SECRET, MEMBER_JWT_SECRET } from "../configs/envConfig.js";
import prisma from "../prismaClient.js";


export const userAuth = (req, res, next) => {
  const token = req.cookies.memberToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return next(createError(401, "User authentication required!"));

  jwt.verify(token, MEMBER_JWT_SECRET, (err, userPayload) => {
    if (err) return next(createError(403, "User token is not valid!"));
    req.user = userPayload;
    next();
  });
};


export const adminAuth = (req, res, next) => {
  const token = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;
    next();
  });
};

export const superAdminAuth = (req, res, next) => {
  const token = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;
    // check if the admin is super admin
    if (req.admin.role !== 1) return next(createError(403, "You don't have permission to access this resource!"));
    next();
  });
};


export const generalAuth = (req, res, next) => {
  const adminToken = req.cookies.adminToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  const userToken = req.cookies.memberToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  const verifyToken = (token, key, type) => {
    if (!token) return;
    jwt.verify(token, key, (err, payload) => {
      if (!err) {
        console.log(payload);
        if (type === 'admin') req.admin = payload;
        if (type === 'user') req.user = payload;
      }
    });
  };

  verifyToken(adminToken, ADMIN_JWT_SECRET, 'admin');
  verifyToken(userToken, MEMBER_JWT_SECRET, 'user');

  if (!req.user && !req.admin) {
    return next(createError(401, "Authentication required!"));
  }
  next();
};

// ROles and Permissions based authorization

const permissionCache = {}; // Simple in-memory cache

const fetchPermissionsForRole = async (roleId) => {
  if (!permissionCache[roleId]) {
    const permissions = await prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
    permissionCache[roleId] = permissions.map(p => p.permission.name);
  }
  return permissionCache[roleId];
};

export const checkPermission = (requiredPermission) => async (req, res, next) => {
  try {
    const adminId = req.admin.adminId; // Assuming admin ID is in req.user
    if (!adminId) throw new Error('Unauthorized: Missing admin ID');

    // check if the admin is super admin
    if (req.admin.role === 1) return next();

    const adminRoles = await prisma.adminRole.findMany({ where: { adminId } });

    for (const adminRole of adminRoles) {
      const permissions = await fetchPermissionsForRole(adminRole.roleId);
      if (permissions.includes(requiredPermission)) {
        return next();
      }
    }

    throw new Error(`Unauthorized: Missing required permission '${requiredPermission}'`);
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};
