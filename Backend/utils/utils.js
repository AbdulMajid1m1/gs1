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