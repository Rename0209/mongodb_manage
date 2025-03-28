const mongoose = require("mongoose");

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

module.exports = { Address };