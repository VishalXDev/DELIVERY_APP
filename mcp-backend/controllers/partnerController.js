// mcp-backend/controllers/partnerController.js
const Partner = require("../models/Partner");  // Correct path to the Partner model

// Delete partner controller function
exports.deletePartnerController = async (req, res) => {
  try {
    const partnerId = req.params.id;
    
    const deletedPartner = await Partner.findByIdAndDelete(partnerId);

    if (!deletedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }

    res.status(200).json({ message: "Partner deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting partner" });
  }
};
