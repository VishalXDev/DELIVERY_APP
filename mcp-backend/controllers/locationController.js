const User = require("../models/User");

exports.updateLocation = async (req, res) => {
  const { lat, lng } = req.body;
  await User.findByIdAndUpdate(req.user.id, { location: { lat, lng } });
  req.app.get("io").emit("locationUpdate", { userId: req.user.id, lat, lng });
  res.json({ success: true });
};
