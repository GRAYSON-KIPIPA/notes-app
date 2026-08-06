const express = require("express");
const { loginValidation } = require("../validators/loginValidator");
const { registerValidation } = require("../validators/authValidator");
const validate = require("../middleware/validationResult");
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  login,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, login);

module.exports = router;
