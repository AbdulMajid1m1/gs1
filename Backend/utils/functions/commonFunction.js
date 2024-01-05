import crypto from "crypto";
import fs1 from 'fs/promises';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
export const generateStrongPassword = (length = 6) => {
    const charset = "123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset[randomIndex];
    }
    return password;
}



export async function convertEjsToPdf(ejsFilePath, data, outputFilePath, landscapeMode = false) {
    try {
        const ejsTemplate = await fs1.readFile(ejsFilePath, 'utf-8');
        const htmlContent = ejs.render(ejsTemplate, { data });

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);

        const pdfOptions = {
            path: outputFilePath,
            format: 'A4',
            printBackground: true,
            landscape: landscapeMode,
        };

        await page.pdf(pdfOptions);
        await browser.close();

        return outputFilePath;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
    }
}
