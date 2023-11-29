import crypto from "crypto";

export const generateStrongPassword = (length = 6) => {
    const charset = "123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, charset.length);
        password += charset[randomIndex];
    }
    return password;
}