const { Address, generateCustomObjectId } = require("../models/addressModel");

const addAddress = async (req, res) => {
    try {
        const { psid, fullName, phone, address, city, state, zipCode, sessionTime } = req.body;

        const _id = generateCustomObjectId(psid, sessionTime); // Tạo `_id`

        // Kiểm tra nếu `_id` đã tồn tại
        let existingRecord = await Address.findOne({ _id });
        if (existingRecord) {
            return res.status(409).json({ message: "Dữ liệu đã tồn tại!", data: existingRecord });
        }

        const newAddress = new Address({
            _id,
            psid,
            fullName,
            phone,
            address,
            city,
            state,
            zipCode,
            sessionTime
        });

        await newAddress.save();
        res.status(201).json({ message: "Đã lưu thành công!", data: newAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAddressById = async (req, res) => {
    try {
        const { psid, timestamp } = req.params; // Nhận psid và timestamp từ URL
        if (!psid || !timestamp) {
            return res.status(400).json({ message: "Thiếu psid hoặc timestamp!" });
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
