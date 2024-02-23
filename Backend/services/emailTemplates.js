import nodemailer from 'nodemailer';
import prisma from '../prismaClient.js';
// Function to fetch email settings from the database using Prisma
async function fetchEmailSettings() {
  try {
    const settings = await prisma.tblEmailSettings.findFirst();
    if (!settings) {
      // throw new Error('No email settings found in the database.');
    }
    return settings;
  } catch (error) {
    console.error('Error fetching email settings from database:', error);
    // Fallback to default settings if fetch fails
    return {
      emailMethod: 'SMTP',
      emailSentFrom: 'gs1noreply@gs1.org.sa',
      smtpHost: 'smtp.office365.com',
      smtpUser: 'gs1noreply@gs1.org.sa',
      smtpPort: 587,
      smtpPassword: 'Nud34189',
      smtpEncryption: 'TLS'
    };
  }
}

// Utility function to create a transporter with settings from database or defaults
async function createEmailTransporter() {
  const settings = await fetchEmailSettings();
  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpEncryption === 'TLS', // true for 465, false for other ports
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword
    }
  });

  return transporter;
}

// Updated sendOTPEmail function
export const sendOTPEmail = async (email, password, subject, footerMessage, pdfBuffer, pdfBuffer2) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = await createEmailTransporter();
      let attachments = [];

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

      const settings = await fetchEmailSettings();

      const mailOptions = {
        from: `Gs1Ksa <${settings.emailSentFrom}>`,
        to: email,
        subject: subject || 'Login Credentials for GS1',
        html: `<h1>Your Login Credentials for GS1</h1>
               <p>Your Login ID: ${email}</p>
               <p>Your Password: ${password}</p>
               ${footerMessage ? `<p>${footerMessage}</p>` : ''}`,
        attachments: attachments
      };

      await transporter.sendMail(mailOptions);
      resolve({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      reject({ success: false, message: 'Something went wrong', error: error });
    }
  });
};

// Updated sendEmail function
export const sendEmail = async ({ fromEmail, toEmail, subject, htmlContent, attachments = [] }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = await createEmailTransporter();
      const settings = await fetchEmailSettings();

      const mailOptions = {
        from: `Gs1Ksa <${fromEmail || settings.emailSentFrom}>`,
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
};

// Updated sendMultipleEmails function
export const sendMultipleEmails = async ({ emailData, fromEmail }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = await createEmailTransporter();
      const settings = await fetchEmailSettings();

      if (!Array.isArray(emailData)) {
        emailData = [emailData]; // Ensure emailData is an array
      }

      await Promise.all(emailData.map(async ({ toEmail, subject, htmlContent, attachments = [] }) => {
        const mailOptions = {
          from: `Gs1Ksa <${fromEmail || settings.emailSentFrom}>`,
          to: toEmail,
          subject: subject || '', // Use the specified subject or empty string
          html: htmlContent || '', // Use the specified content or empty string
          attachments: attachments.map(attachment => ({
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType
          }))
        };

        await transporter.sendMail(mailOptions);
      }));

      resolve({ success: true, message: 'Emails sent successfully!' });
    } catch (error) {
      reject({ success: false, message: 'Error in sending emails', error: error });
    }
  });
};
