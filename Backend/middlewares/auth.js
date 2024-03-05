import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import {
  ADMIN_JWT_SECRET,
  JWT_SECRET,
  MEMBER_JWT_SECRET,
} from "../configs/envConfig.js";
import prisma from "../prismaClient.js";

export const userAuth = (req, res, next) => {
  const token =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "User authentication required!"));

  jwt.verify(token, MEMBER_JWT_SECRET, (err, userPayload) => {
    if (err) return next(createError(403, "User token is not valid!"));
    req.user = userPayload;
    next();
  });
};

export const adminAuth = (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;
    next();
  });
};

export const superAdminAuth = (req, res, next) => {
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) return next(createError(403, "Admin token is not valid!"));
    req.admin = adminPayload;

    // check if the admin is super admin
    if (req.admin.is_super_admin !== 1)
      return next(
        createError(
          403,
          "Super admin authentication required to access this resource!"
        )
      );
    next();
  });
};

export const generalAuth = (req, res, next) => {
  const adminToken =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  const userToken =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  const verifyToken = (token, key, type) => {
    if (!token) return;
    console.log("Verifying...", key, "..", type);
    jwt.verify(token, key, (err, payload) => {
      if (!err) {
          // Calculate remaining time
      const now = moment().unix(); // current time in Unix epoch seconds
      const exp = payload.exp; // expiration time from the token payload
      const remainingTime = exp - now; // remaining time in seconds
      const duration = moment.duration(remainingTime, 'seconds');
      
      // Format remaining time into days and minutes
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      console.log(`Token expires in ${days} days, ${hours} hours, and ${minutes} minutes.`);
        console.log("payload");
        if (type === "admin") req.admin = payload;
        if (type === "user") req.user = payload;
      }
      if(err){
        return next(err);
      }
    });
  };

  verifyToken(adminToken, ADMIN_JWT_SECRET, "admin");
  verifyToken(userToken, MEMBER_JWT_SECRET, "user");

  console.log("user");
  console.log(req.user);
  console.log("admin");
  console.log(req.admin);
  if (!req.user && !req.admin) {
    return next(
      createError(
        401,
        "Authentication required! Please login to access this resource!"
      )
    );
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
    permissionCache[roleId] = permissions.map((p) => p.permission.name);
  }
  return permissionCache[roleId];
};

export const checkPermission =
  (requiredPermissions) => async (req, res, next) => {
    try {
      const adminId = req.admin.adminId; // Assuming admin ID is in req.user
      if (!adminId) throw createError(403, "Unauthorized: Missing admin ID");
      console.log(adminId);
      // check if the admin is super admin
      if (req.admin.is_super_admin === 1) return next();

      const adminRoles = await prisma.adminRole.findMany({
        where: { adminId },
      });

      let hasPermission = false;
      for (const adminRole of adminRoles) {
        const permissions = await fetchPermissionsForRole(adminRole.roleId);
        console.log("all permissions", permissions);

        // Support for checking multiple required permissions
        if (Array.isArray(requiredPermissions)) {
          console.log("required Permissions", requiredPermissions);
          // Check if all required permissions are included in the permissions array
          hasPermission = requiredPermissions.every((rp) =>
            permissions.includes(rp)
          );
        } else {
          console.log("required Permission", requiredPermissions);
          // Single permission check for backward compatibility
          hasPermission = permissions.includes(requiredPermissions);
        }

        if (hasPermission) {
          return next();
        }
      }

      throw createError(403, `Unauthorized: Missing required permission(s)`);
    } catch (error) {
      next(error);
    }
  };
