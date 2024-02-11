// import jwt from 'jsonwebtoken';
// import { isProduction, } from '../config/config.js';

export const userDataProperties = user => ({
    _id: user._id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});

export const cookieOptions = () => ({
    httpOnly: true, // Prevents client-side script from accessing the cookie
    secure: true, // Ensures the cookie is sent only over HTTPS
    sameSite: 'None', // Use 'None' for cross-site cookie use. Requires `secure: true` to work.
});

