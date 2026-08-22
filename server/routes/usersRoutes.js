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
  getMyProfile,
  getUserById,
  login,
  deleteUsers,
  updateMyProfile,
  changeUserPassword,
} = require("../controllers/usersController");
const {
  updateProfileValidator,
} = require("../validators/updateProfileValidator");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware("admin"), getAllUsers);
router.get("/me", authMiddleware, getMyProfile);
router.get("/:id", authMiddleware, roleMiddleware("admin"), getUserById);
router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, login);
router.delete("/", authMiddleware, roleMiddleware("admin"), deleteUsers);
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
