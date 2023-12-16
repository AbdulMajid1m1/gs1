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
