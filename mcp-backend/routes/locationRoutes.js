const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { updateLocation } = require("../controllers/locationController");

router.post("/update", auth, updateLocation);

module.exports = router;
