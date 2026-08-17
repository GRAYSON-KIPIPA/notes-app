const express = require("express");
const { loginValidation } = require("../validators/loginValidator");
const { registerValidation } = require("../validators/authValidator");
const validate = require("../middleware/validationResult");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUsers,
  login,
  deleteUsers,
  getMyProfile,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.get("/me", authMiddleware, getMyProfile);
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, login);
router.delete("/", authMiddleware, deleteUsers);

module.exports = router;
