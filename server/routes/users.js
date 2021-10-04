// libraries
const express = require("express");
const router = express.Router();

// middlewares and controllers
const register = require("../controllers/register");
const login = require("../controllers/login");

// register
router.post("/register", register);

// login
router.post("/login", login);

module.exports = router;
