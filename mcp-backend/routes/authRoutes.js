const express = require("express");
const router = express.Router();
const { deletePartnerController } = require("../controllers/partnerController");

// DELETE route for deleting a partner
router.delete("/:id", deletePartnerController);

module.exports = router;
