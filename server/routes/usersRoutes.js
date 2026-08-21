const express = require("express");
const { loginValidation } = require("../validators/loginValidator");
const { registerValidation } = require("../validators/authValidator");
const {
  changePasswordValidator,
} = require("../validators/changePasswordValidator");
const validate = require("../middleware/validationResult");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  registerUser,
  getAllUsers,
  login,
  deleteUsers,
  getMyProfile,
  updateMyProfile,
  changeUserPassword,
} = require("../controllers/usersController");
const {
  updateProfileValidator,
} = require("../validators/updateProfileValidator");

router.get("/", getAllUsers);
router.get("/me", authMiddleware, getMyProfile);
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, login);
router.delete("/", authMiddleware, deleteUsers);
router.put(
  "/me",
  authMiddleware,
  updateProfileValidator,
  validate,
  updateMyProfile,
);
router.put(
  "/change-password",
  authMiddleware,
  changePasswordValidator,
  validate,
  changeUserPassword,
);

module.exports = router;
