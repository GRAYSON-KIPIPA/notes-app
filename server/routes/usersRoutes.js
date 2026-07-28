const express = require("express");

const router = express.Router();

const { registerUser, getAllUsers } = require("../controllers/usersController");

router.get("/", getAllUsers);
router.post("/", registerUser);

module.exports = router;
