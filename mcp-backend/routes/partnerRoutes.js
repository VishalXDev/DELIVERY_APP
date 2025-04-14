const express = require("express");
const router = express.Router();
const {
  deletePartnerController,
  getAllPartners,
  createPartner,
  updatePartner,
} = require("../controllers/partnerController");

// Get all partners
router.get("/", async (req, res) => {
  try {
    await getAllPartners(req, res);
  } catch (error) {
    console.error("Error fetching partners:", error);
    res.status(500).send("Failed to fetch partners");
  }
});

// Create a new partner
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate partner data
    if (!name || !email || !phone) {
      return res.status(400).send("Missing required partner information");
    }

    await createPartner(req, res);
  } catch (error) {
    console.error("Error creating partner:", error);
    res.status(500).send("Failed to create partner");
  }
});

// Update an existing partner by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // Validate partner data
    if (!name || !email || !phone) {
      return res.status(400).send("Missing required partner information");
    }

    await updatePartner(req, res, id);
  } catch (error) {
    console.error("Error updating partner:", error);
    res.status(500).send("Failed to update partner");
  }
});

// Delete a partner by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await deletePartnerController(req, res, id);
  } catch (error) {
    console.error("Error deleting partner:", error);
    res.status(500).send("Failed to delete partner");
  }
});

module.exports = router;
