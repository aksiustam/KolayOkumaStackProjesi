const express = require("express");

const { createAdmin } = require("../controllers/admin.js");
const { authenticateWithJwt } = require("../middleware/jwt.js");
const { checkIsInRole } = require("../middleware/auth.js");
const router = express.Router();

router.post(
  "/admin/new",

  createAdmin
);

module.exports = router;
