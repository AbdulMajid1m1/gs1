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

            // Initialize an empty attachments array
            let attachments = [];

            // Add attachments conditionally
            if (pdfBuffer && pdfBuffer.invoiceBuffer) {
                attachments.push({
                    filename: pdfBuffer.pdfFilename ? pdfBuffer.pdfFilename : 'Invoice.pdf',
                    content: pdfBuffer.invoiceBuffer,
                    contentType: 'application/pdf'
                });
            }

            if (pdfBuffer2) {
                attachments.push({
                    filename: 'GS1_Saudi_Arabia_Data_Declaration.pdf',
                    content: pdfBuffer2,
                    contentType: 'application/pdf'
                });
            }

            const mailOptions = {
                from: `Gs1Ksa <${process.env.EMAIL}>`,
                to: email,
                subject: subject || 'Login Credentials for GS1',
                html: `<h1>Your Login Credentials for GS1</h1>
                       <p>Your Login ID: ${email}</p>
                       <p>Your Password: ${password}</p>
                       ${footerMessage ? `<p>${footerMessage}</p>` : ''}`,
                // Use the attachments array
                attachments: attachments
            };

            const info = await transporter.sendMail(mailOptions);
            resolve({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            reject({ success: false, message: 'Something went wrong', error: error });
        }
    });
};




export const sendEmail = async ({
    fromEmail = process.env.ADMIN_EMAIL,
    toEmail,
    subject,
    htmlContent,
    attachments = []
}) => {
    return new Promise(async (resolve, reject) => {
        console.log("fromEmail", attachments)
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                }
            });

            const mailOptions = {
                from: `Gs1Ksa <${fromEmail}>`,
                to: toEmail,
                subject: subject,
                html: htmlContent,
                attachments: attachments.map(attachment => ({
                    filename: attachment.filename,
                    content: attachment.content,
                    contentType: attachment.contentType
                }))
            };

            await transporter.sendMail(mailOptions);
            resolve({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            reject({ success: false, message: 'Error in sending email', error: error });
        }
    });
}
