const express = require("express");

const router = express.Router();

const {
  registerUser,
  getAllUsers,
  login,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", registerUser);
router.post("/login", login);

module.exports = router;
