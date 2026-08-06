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
router.post("/", noteValidation, validate, authMiddleware, createNote);
router.get("/:id", getNote, authMiddleware);
router.put("/:id", updateNote, authMiddleware);
router.delete("/:id", deleteNote, authMiddleware);

module.exports = router;
