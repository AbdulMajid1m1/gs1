import dotenv from 'dotenv';

dotenv.config();

export const DATABASE_URL = process.env.DATABASE_URL;
export const GMAIL_USERNAME = process.env.GMAIL_USERNAME;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
export const BACKEND_URL = process.env.BACKEND_URL;
export const MEMBER_JWT_SECRET = process.env.MEMBER_JWT_SECRET;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;