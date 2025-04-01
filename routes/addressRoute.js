const express = require("express");
const { addAddress, getAddressById } = require("../controllers/addressController");

const router = express.Router();

router.post("/address", addAddress);
router.get("/address/:token", getAddressById);

module.exports = router;
