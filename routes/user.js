const express = require("express");
const { signupUser, loginUser } = require("../controllers/user");

const router = express.Router();
// auth routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
