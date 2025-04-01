const crypto = require("crypto");

// Hàm tạo _id từ psid
const generateCustomObjectId = (psid) => {
    // Tạo hash 24 ký tự từ psid
    const psidHash = crypto.createHash('md5').update(psid).digest("hex").slice(0, 24);
    return psidHash;
};

module.exports = { generateCustomObjectId };