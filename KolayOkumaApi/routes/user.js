const express = require("express");

const { allUsers } = require("../controllers/user.js");
const { authenticateWithJwt } = require("../middleware/jwt.js");
const { checkIsInRole } = require("../middleware/auth.js");
const router = express.Router();

router.get("/users", authenticateWithJwt, checkIsInRole("admin"), allUsers);

module.exports = router;
