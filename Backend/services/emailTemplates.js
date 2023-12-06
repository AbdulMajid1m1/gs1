import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';
import { GMAIL_PASSWORD, GMAIL_USERNAME } from '../configs/envConfig.js';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const sendOTPEmail = async (email, password, subject, footerMessage, pdfBuffer, pdfBuffer2) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: GMAIL_USERNAME, // your email
                    pass: GMAIL_PASSWORD // your app password
                }
            });

            const mailOptions = {
                from: `Gs1Ksa <${process.env.EMAIL}>`,
                to: email,
                subject: subject || 'Login Credentials for GS1',

                html: `<h1>Your Login Credentials for GS1</h1>
                <p>Your Login ID: ${email}</p>
                <p>Your Password: ${password}</p>
                ${footerMessage ? `<p>${footerMessage}</p>` : ''}`,
                attachments: [{
                    filename: 'invoice.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                },
                {
                    filename: 'GS1_Saudi_Arabia_Data_Declaration.pdf', // Second PDF file
                    content: pdfBuffer2,
                    contentType: 'application/pdf'
                }


                ]

            };

            const info = await transporter.sendMail(mailOptions);
            resolve({ success: true, message: 'OTP sent successfully!' });
        } catch (error) {
            reject({ success: false, message: 'Something went wrong', error: error });
        }
    });
}
