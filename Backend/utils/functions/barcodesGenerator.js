export const generateGTIN13 = (barcode) => {
    // Remove any spaces from the barcode
    barcode = barcode.replace(/\s/g, '');

    // Pad the barcode with trailing zeros if its length is less than 12
    barcode = barcode.padEnd(12, '0');

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(barcode[i]);
        // Alternate weighting of 3 and 1 from right to left (starting with 1 for the rightmost digit)
        const multiplier = (i % 2 === 0) ? 1 : 3;
        sum += digit * multiplier;
    }

    // Calculate check digit
    const checkDigit = (10 - (sum % 10)) % 10;

    // Return the complete 13-digit GTIN
    return barcode + checkDigit;
}




    function calculateCheckDigit(gtinWithoutCheckDigit) {
        const digits = gtinWithoutCheckDigit.split('').map(Number);
        let sum = 0;

        // EAN-13 check digit calculation (modulo-10 algorithm)
        for (let i = 0; i < digits.length; i++) {
            sum += (i % 2 === 0) ? digits[i] * 1 : digits[i] * 3;
        }

        const remainder = sum % 10;
        const checkDigit = (remainder === 0) ? 0 : 10 - remainder;

        return checkDigit.toString();
    }


function lengthSeven(productRange) {
    const range = parseInt(productRange, 10);
    if (range < 10) return '0000' + range;
    if (range < 100) return '000' + range;
    if (range < 1000) return '00' + range;
    if (range < 10000) return '0' + range;
    if (range < 100000) return '' + range;
    return "false";
}

function lengthEight(productRange) {
    const range = parseInt(productRange, 10);
    if (range < 10) return '000' + range;
    if (range < 100) return '00' + range;
    if (range < 1000) return '0' + range;
    if (range < 10000) return '' + range;
    return "false";
}

function lengthNine(productRange) {
    const range = parseInt(productRange, 10);
    if (range < 10) return '00' + range;
    if (range < 100) return '0' + range;
    if (range < 1000) return '' + range;
    return "false";
}

function lengthTen(productRange) {
    const range = parseInt(productRange, 10);
    if (range < 10) return '0' + range;
    if (range < 100) return '' + range;
    return "false";
}

function lengthEleven(productRange) {
    const range = parseInt(productRange, 10);
    if (range < 10) return '' + range;
    return "false";
}


export async function generateProdcutGTIN(gcpGLNID, productsCount) {

const gcpLength = gcpGLNID.length;
console.log(gcpLength)
let barcodeNumber = "";
const productRange = productsCount + 1;

switch (gcpLength) {
    case 7: barcodeNumber = gcpGLNID + lengthSeven(productRange); break;
    case 8: barcodeNumber = gcpGLNID + lengthEight(productRange); break;
    case 9: barcodeNumber = gcpGLNID + lengthNine(productRange); break;
    case 10: barcodeNumber = gcpGLNID + lengthTen(productRange); break;
    case 11: barcodeNumber = gcpGLNID + lengthEleven(productRange); break;
    default: return "false";
}

if (barcodeNumber === "false") {
    return "false";
}

const gtinWithCheckDigit = barcodeNumber + calculateCheckDigit(barcodeNumber); // Implement `calculateCheckDigit`
return gtinWithCheckDigit;
}

