const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationResult");
const { categoryValidator } = require("../validators/categoryValidator");

const router = express.Router();
const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
} = require("../controllers/categoriesController");

router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getSingleCategory);
router.post("/", authMiddleware, categoryValidator, validate, createCategory);
router.delete("/:id", authMiddleware, deleteCategory);
router.put("/:id", authMiddleware, categoryValidator, validate, updateCategory);
module.exports = router;
