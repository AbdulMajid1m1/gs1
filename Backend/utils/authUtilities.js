// import jwt from 'jsonwebtoken';
// import { isProduction, } from '../config/config.js';

export const userDataProperties = user => ({
    _id: user._id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
});
// for https:
export const cookieOptions = () => ({
    httpOnly: true,
    // secure: true,
    secure: false,// False to Allow both HTTP and HTTPS
    sameSite: 'Lax', // Lax to allow CSRF protection by default and strict to disallow CSRF protection and None to disable CSRF protection
});


// for http 
// export const cookieOptions = () => ({
//     httpOnly: true,
//     secure: false, // Allow both HTTP and HTTPS
//     sameSite: 'Lax', // Lax to allow CSRF protection by default and strict to disallow CSRF protection and None to disable CSRF protection
// });
