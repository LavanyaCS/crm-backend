const express = require("express");
const { registerUser, loginUser, getProfile, getProfileById } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware(["admin"]), getProfile);
router.get("/profile/:id", authMiddleware(), getProfileById);

module.exports = router;
