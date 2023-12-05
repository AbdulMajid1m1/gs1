// utility function to serialize BigInt values as strings
export const serializeBigInt = (obj) => {
    if (typeof obj === 'bigint') {
        return obj.toString();
    } else if (Array.isArray(obj)) {
        return obj.map(serializeBigInt);
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            obj[key] = serializeBigInt(obj[key]);
        }
    }
    return obj;
}

export const generateRandomTransactionId = (length) => {
    let transactionId = '';
    for (let i = 0; i < length; i++) {
        transactionId += Math.floor(1 + Math.random() * 9).toString();
    }

    return transactionId;
};
