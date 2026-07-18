const express = require("express");
const { validateRegister, validateLogin } = require("../validations/authValidation");
const { register, login, logout, me } = require("../controllers/authController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", verifyToken, logout);
router.get("/me", verifyToken, me);

module.exports = router;
