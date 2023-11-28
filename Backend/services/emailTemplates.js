import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const sendOTPEmail = async (email, otp, subject, footerMessage) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL, // your email
                    pass: process.env.APP_PASSWORD // your app password
                }
            });

            const mailOptions = {
                from: `Gs1Ksa <${process.env.EMAIL}>`,
                to: email,
                subject: subject || 'OTP for GS1',
                text: `Your OTP is ${otp}`,
                html: `<h1>Your OTP is ${otp}</h1>
                ${footerMessage ? `<p>${footerMessage}</p>` : ''}`

            };

            const info = await transporter.sendMail(mailOptions);
            resolve({ success: true, message: 'OTP sent successfully!' });
        } catch (error) {
            reject({ success: false, message: 'Something went wrong', error: error });
        }
    });
}
