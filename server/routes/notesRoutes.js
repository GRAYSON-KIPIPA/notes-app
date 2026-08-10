const express = require("express");

const { noteValidation } = require("../validators/noteValidator");
const validate = require("../middleware/validationResult");

const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notesController.");

router.get("/", authMiddleware, getAllNotes);
router.post("/", authMiddleware, noteValidation, validate, createNote);
router.get("/:id", authMiddleware, getNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;
