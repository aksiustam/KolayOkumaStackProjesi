const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const createAdmin = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const admin = await Admin.findOne({ name: name }).lean();
    if (admin) {
      return res
        .status(500)
        .json({ message: "User already exist. Please login!" });
    }
    if (!admin) {
      const encryptedPassword = await bcrypt.hash(password, 10);

      let newUser = new Admin({
        name: name,
        password: encryptedPassword,
      });

      newUser.save();
      return res.status(200).json({
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
};
