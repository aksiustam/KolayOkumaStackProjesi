const express = require("express");

const { to } = require("await-to-js");

const { login } = require("../utils/utils.js");

const router = express.Router();
const Admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");

//Login passport authentication
router.post("/login", async function (req, res) {
  const { name, password } = req.body;
  const admin = await Admin.findOne({ name: name }).lean();

  if (!admin) {
    return res.status(500).json({ message: "No user found!" });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    return res.status(500).json({ message: "Email or Password not valid!" });
  }

  const [error, token] = await to(login(req, admin));

  if (error) {
    return res.status(500).json({ message: error });
  }
  const data = {
    id: admin._id,
    name: admin.name,
    role: admin.role,
  };
  return res.status(200).json({
    success: true,
    token: token,
    data: data,
  });
});

//Register passport authentication
router.post("/register", async (req, res) => {
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
});

module.exports = router;
