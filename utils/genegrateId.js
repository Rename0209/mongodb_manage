const crypto = require("crypto");

// Hàm tạo _id tương tự ObjectId từ psid + session_time
const generateCustomObjectId = (psid, sessionTimestamp) => {
    const timestampHex = Math.floor(sessionTimestamp / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
    const psidHash = crypto.createHash('md5').update(psid).digest("hex").slice(0, 16); // 8 byte hash từ psid

    return timestampHex + psidHash; // Tổng 24 ký tự, luôn cố định
};

module.exports = { generateCustomObjectId };