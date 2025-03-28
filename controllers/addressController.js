const { Address } = require("../models/addressModel");
const { generateCustomObjectId } = require("../utils/genegrateId");
const { decryptAES } = require("../utils/encryption");

const addAddress = async (req, res) => {
    try {
        const { token, fullName, phone, address, city, state, zipCode, sessionTimestamp } = req.body;

        // Giải mã token để lấy `psid`
        const psid = decryptAES(token);
        if (!psid) {
            return res.status(400).json({ message: "Token không hợp lệ!" });
        }

        const _id = generateCustomObjectId(psid, sessionTimestamp); // Tạo `_id`

        // Kiểm tra nếu `_id` đã tồn tại
        let existingRecord = await Address.findOne({ _id });
        if (existingRecord) {
            // Cập nhật dữ liệu ngoại trừ `psid` và `sessionTimestamp`
            existingRecord.fullName = fullName;
            existingRecord.phone = phone;
            existingRecord.address = address;
            existingRecord.city = city;
            existingRecord.state = state;
            existingRecord.zipCode = zipCode;

            await existingRecord.save();
            return res.status(200).json({ message: "Dữ liệu đã được cập nhật!", data: existingRecord });
        }

        // Nếu không tồn tại thì thêm mới
        const newAddress = new Address({
            _id,
            psid,
            fullName,
            phone,
            address,
            city,
            state,
            zipCode,
            sessionTimestamp
        });

        await newAddress.save();
        res.status(201).json({ message: "Đã lưu thành công!", data: newAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAddressById = async (req, res) => {
    try {
        const { token, timestamp } = req.params; // Nhận psid và timestamp từ URL
        if (!token || !timestamp) {
            return res.status(400).json({ message: "Thiếu token hoặc timestamp!" });
        }

        const psid = decryptAES(token);
        if (!psid) {
            return res.status(400).json({ message: "Token không hợp lệ!" });
        }

        const id = generateCustomObjectId(psid, parseInt(timestamp)); // Tạo _id từ psid & timestamp
        const address = await Address.findOne({ _id: id }); // Tìm trong MongoDB

        if (!address) {
            return res.status(404).json({ message: "Không tìm thấy địa chỉ!" });
        }

        res.json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addAddress, getAddressById };
