const mongoose = require("mongoose");
const crypto = require("crypto");

// Hàm tạo _id tương tự ObjectId từ psid + session_time
const generateCustomObjectId = (psid, sessionTimestamp) => {
    const timestampHex = Math.floor(sessionTimestamp / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
    const psidHash = crypto.createHash('md5').update(psid).digest("hex").slice(0, 16); // 8 byte hash từ psid

    return timestampHex + psidHash; // Tổng 24 ký tự, luôn cố định
};

const addressSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // _id được tạo từ psid + session_time
    psid: { type: String, required: true }, // Lưu cả psid vào MongoDB
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    sessionTimestamp: { type: Number, required: true } // Unix timestamp
}, { versionKey: false });

const Address = mongoose.model("Address", addressSchema);

module.exports = { Address, generateCustomObjectId };