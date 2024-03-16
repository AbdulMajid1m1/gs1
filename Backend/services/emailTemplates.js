import nodemailer from 'nodemailer';
import prisma from '../prismaClient.js';






// Assuming PrismaClient and nodemailer have been imported as shown previously

// Function to fetch email settings from the database or use defaults
async function fetchEmailSettings()
{
  const settings = await prisma.emailsetting.findFirst({
    where: { status: 1 }, // Example: fetch settings where status is active
  });
  // console.log('settings, ', settings)
  return {
    emailMethod: settings?.emailmethod,
    emailSentFrom: settings?.emailfrom,
    smtpHost: settings?.smtp_host,
    smtpUser: settings?.smtp_username,
    smtpPort: settings?.smtp_port,
    smtpPassword: settings?.smtp_password,
    smtpEncryption: settings?.smtp_encryption,
  };
}

// Dynamically create email transporter based on fetched settings
async function createEmailTransporter()
{
  const settings = await fetchEmailSettings();
  // console.log('settings 2, ', settings)
  return nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: false,// true for 465, false for other ports
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword,
    },
    tls: {
      // If required, enable additional TLS options here
      rejectUnauthorized: false
    }
  });
}


// Updated sendOTPEmail function
export const sendOTPEmail = async (email, password, subject, footerMessage, pdfBuffer, pdfBuffer2) =>
{
  return new Promise(async (resolve, reject) =>
  {
    try {
      const transporter = await createEmailTransporter();
      const settings = await fetchEmailSettings();

      let attachments = [];
      if (pdfBuffer && pdfBuffer.invoiceBuffer) {
        attachments.push({ filename: pdfBuffer.pdfFilename || 'Invoice.pdf', content: pdfBuffer.invoiceBuffer, contentType: 'application/pdf' });
      }
      if (pdfBuffer2) {
        attachments.push({ filename: 'GS1_Saudi_Arabia_Data_Declaration.pdf', content: pdfBuffer2, contentType: 'application/pdf' });
      }

      const mailOptions = {
        from: `Gs1Ksa <${settings.emailSentFrom}>`,
        to: email,
        subject: subject || 'Login Credentials for GS1',
        html: `<h1>Your Login Credentials for GS1</h1><p>Your Login ID: ${email}</p><p>Your Password: ${password}</p>${footerMessage ? `<p>${footerMessage}</p>` : ''}`,
        attachments: attachments,
      };

      await transporter.sendMail(mailOptions);
      resolve({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      reject({ success: false, message: 'Something went wrong', error: error });
    }
  });
};

// Updated sendEmail function
export const sendEmail = async ({ fromEmail, toEmail, subject, htmlContent, attachments = [], replyToEmail = null }) =>
{
  return new Promise(async (resolve, reject) =>
  {
    try {
      const transporter = await createEmailTransporter();
      const settings = await fetchEmailSettings();

      const mailOptions = {
        from: `Gs1Ksa <${fromEmail || settings.emailSentFrom}>`,
        // If replyToEmail is provided, set the reply-to address
        replyTo: replyToEmail,
        to: toEmail,
        subject: subject,
        html: htmlContent,
        attachments: attachments.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        })),
      };

      await transporter.sendMail(mailOptions);
      resolve({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      reject({ success: false, message: 'Error in sending email', error: error });
    }
  });
};




// Updated sendMultipleEmails function
export const sendMultipleEmails = async ({ emailData, fromEmail }) =>
{
  return new Promise(async (resolve, reject) =>
  {
    try {
      const transporter = await createEmailTransporter();
      const settings = await fetchEmailSettings();

      if (!Array.isArray(emailData)) {
        emailData = [emailData]; // Ensure emailData is an array
      }

      await Promise.all(emailData.map(async ({ toEmail, subject, htmlContent, attachments = [] }) =>
      {
        const mailOptions = {
          from: `Gs1Ksa <${fromEmail || settings.emailSentFrom}>`,
          to: toEmail,
          subject: subject || '',
          html: htmlContent || '',
          attachments: attachments.map(attachment => ({
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          })),
        };

        await transporter.sendMail(mailOptions);
      }));

      resolve({ success: true, message: 'Emails sent successfully!' });
    } catch (error) {
      reject({ success: false, message: 'Error in sending emails', error: error });
    }
  });
};
