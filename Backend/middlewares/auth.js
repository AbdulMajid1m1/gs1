import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import { ADMIN_JWT_SECRET, JWT_SECRET, MEMBER_JWT_SECRET } from "../configs/envConfig.js";


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
