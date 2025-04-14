const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
router.delete("/partners/:id", deletePartnerController);
exports.deletePartnerController = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Partner deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete partner" });
    }
  };
  
router.post("/register", register);
router.post("/login", login);

module.exports = router;
