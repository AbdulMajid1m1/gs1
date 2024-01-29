import QRCode from 'qrcode';
import { fileURLToPath } from 'url'; // Import the fileURLToPath function
import path from 'path';
import fs from 'fs/promises';
import fs1 from 'fs';
import { sendMultipleEmails } from '../../services/emailTemplates.js';
import { convertEjsToPdf } from './commonFunction.js';
import prisma from '../../prismaClient.js';
// Define the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));


export const handleInvoiceReminders = async () => {
    try {
        const oneDayAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

        const pendingInvoices = await prisma.member_documents.findMany({
            where: {
                type: 'invoice',
                status: 'pending',
                cron_job_check_time: {
                    lt: oneDayAgo
                }
            },
            include: {
                user: {
                    include: {
                        carts: true,
                        assign_to_admin: true
                    }
                }
            }
        });
        console.log('pendingInvoices:', pendingInvoices);
        let emailData = [];
        for (const invoice of pendingInvoices) {
            const user = invoice.user;
            const admin = user.assign_to_admin;
            const cartValue = user.carts[0]; // Assuming the relevant cart is the first one
            cartValue.cart_items = JSON.parse(cartValue.cart_items);

            const qrCodeDataURL = await QRCode.toDataURL('http://www.gs1.org.sa');

            const data1 = {
                topHeading: "INVOICE",
                secondHeading: "BILL TO",
                memberData: {
                    qrCodeDataURL: qrCodeDataURL,
                    // registeration: `New Registration for the year ${new Date().getFullYear()}`,
                    registeration: `New Registration`,
                    // Assuming $addMember->id is already known
                    company_name_eng: user.company_name_eng,
                    mobile: user.mobile,
                    address: {
                        zip: user.zip_code,
                        countryName: user.country,
                        stateName: user.state,
                        cityName: user.city,
                    },
                    companyID: user.companyID,
                    membership_otherCategory: user.membership_category,
                    gtin_subscription: {
                        products: {
                            member_category_description: cartValue?.cart_items[0]?.productName,
                        },
                    },
                },

                cart: cartValue,


                currentDate: {
                    day: new Date().getDate(),
                    month: new Date().getMonth() + 1, // getMonth() returns 0-11
                    year: new Date().getFullYear(),
                },



                company_details: {
                    title: 'Federation of Saudi Chambers',
                    account_no: '25350612000200',
                    iban_no: 'SA90 1000 0025 3506 1200 0200',
                    bank_name: 'Saudi National Bank - SNB',
                    bank_swift_code: 'NCBKSAJE',
                },
                BACKEND_URL: BACKEND_URL
            };

            const pdfDirectory = path.join(__dirname, '..', '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
            const pdfFilename = `Invoice-Reminder-${user?.company_name_eng}-${invoice.transaction_id}.pdf`;
            const pdfFilePath = path.join(pdfDirectory, pdfFilename);

            if (!fs.existsSync(pdfDirectory)) {
                fs.mkdirSync(pdfDirectory, { recursive: true });
            }

            await convertEjsToPdf(path.join(__dirname, '..', '..', 'views', 'pdf', 'customInvoice.ejs'), data1, pdfFilePath);

            const invoiceBuffer = await fs.readFile(pdfFilePath);

            // Prepare email data for both user and admin
            emailData.push({
                toEmail: user.email,
                subject: `Invoice Reminder`,
                htmlContent: `<h1>Invoice Reminder</h1><p>Your invoice with transaction ID: ${invoice.transaction_id} is still pending.</p>`,
                attachments: [{ filename: pdfFilename, content: invoiceBuffer, contentType: 'application/pdf' }]
            });

            if (admin && admin.email) {
                emailData.push({
                    toEmail: admin.email,
                    subject: `Invoice Reminder for ${user.company_name_eng}`,
                    htmlContent: `<h1>Invoice Reminder for ${user.company_name_eng}</h1><p>The invoice with transaction ID: ${invoice.transaction_id} is still pending.</p>`,
                    attachments: [{ filename: pdfFilename, content: invoiceBuffer, contentType: 'application/pdf' }]
                });
            }

            // Update cron_job_check_time
            await prisma.member_documents.update({
                where: { id: invoice.id },
                data: { cron_job_check_time: new Date() }
            });
        }

        // Send all emails at once
        if (emailData.length > 0) {
            await sendMultipleEmails(emailData);
            // delete pdf files from the server
            for (const invoice of pendingInvoices) {
                const pdfDirectory = path.join(__dirname, '..', '..', 'public', 'uploads', 'documents', 'MemberRegInvoice');
                const pdfFilename = `Invoice-Reminder-${invoice.user?.company_name_eng}-${invoice.transaction_id}.pdf`;
                const pdfFilePath = path.join(pdfDirectory, pdfFilename);

                try {
                    await fs1.unlinkSync(pdfFilePath);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }


    } catch (error) {
        console.error('Error in handleInvoiceReminders:', error);
        return { success: false, error: error };
    }
};

handleInvoiceReminders();
