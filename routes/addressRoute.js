const express = require("express");
const { addAddress, getAddressById } = require("../controllers/addressController");

const router = express.Router();

router.post("/address", addAddress);
router.get("/address/:token/:timestamp", getAddressById);

module.exports = router;
