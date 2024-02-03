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
    httpOnly: true,
    // secure: isProduction,
    secure: false,// False to Allow both HTTP and HTTPS
    sameSite: 'Lax', // None to Allow both HTTP and HTTPS
});

