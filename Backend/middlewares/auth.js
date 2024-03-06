import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import {
  ADMIN_JWT_SECRET,
  JWT_SECRET,
  MEMBER_JWT_SECRET,
} from "../configs/envConfig.js";
import prisma from "../prismaClient.js";

export const userAuth = (req, res, next) => {
  console.log("trigger userAuth");
  const token =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "User authentication required!"));

  jwt.verify(token, MEMBER_JWT_SECRET, (err, userPayload) => {
    if (err) {
      console.log("Error in userAuth", err);
      return next(createError(403, err.message));
    }
    console.log("User Payload", userPayload);
    req.user = userPayload;
    next();
  });
};

export const adminAuth = (req, res, next) => {
  console.log("trigger adminAuth");
  const token =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) return next(createError(401, "Admin authentication required!"));

  jwt.verify(token, ADMIN_JWT_SECRET, (err, adminPayload) => {
    if (err) {
      console.log("Error in adminAuth", err);
      return next(createError(403, err.message));
    }
    console.log("Admin Payload", adminPayload);
    req.admin = adminPayload;
    next();
  });
};

export const superAdminAuth = (req, res, next) => {
  console.log("trigger superAdminAuth");
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
  console.log("trigger generalAuth");
  const adminToken =
    req.cookies.adminToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  const userToken =
    req.cookies.memberToken ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  console.log(adminToken, " .... ", userToken);

  // Wrap jwt.verify in a Promise
  const verifyToken = (token, key, type) => {
    return new Promise((resolve, reject) => {
      if (!token) {
        resolve(null); // Resolve to null if no token is provided, to avoid rejecting the promise
        return;
      }
      jwt.verify(token, key, (err, payload) => {
        if (err) {
          console.log("Token verification failed:", err);
          reject(err); // Reject the promise on error
        } else {
          resolve({ type, payload }); // Resolve with the payload and type
        }
      });
    });
  };

  // Use Promise.allSettled to wait for both verifications
  Promise.allSettled([
    verifyToken(adminToken, ADMIN_JWT_SECRET, "admin"),
    verifyToken(userToken, MEMBER_JWT_SECRET, "user"),
  ]).then(results => {
    results.forEach(result => {
      if (result.status === "fulfilled" && result.value) {
        const { type, payload } = result.value;
        if (type === "admin") req.admin = payload;
        if (type === "user") req.user = payload;
      }
    });

    // Proceed only if at least one token is valid
    if (!req.user && !req.admin) {
      next(createError(401, "Authentication required! Please login to access this resource!"));
    } else {
      next();
    }
  });
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
