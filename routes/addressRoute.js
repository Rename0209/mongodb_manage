const express = require("express");
const { addAddress, getAddressById } = require("../controllers/addressController");

const router = express.Router();

router.post("/address", addAddress);
router.get("/address/:psid/:timestamp", getAddressById);

module.exports = router;
