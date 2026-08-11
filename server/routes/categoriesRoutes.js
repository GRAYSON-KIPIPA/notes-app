const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationResult");
const { categoryValidator } = require("../validators/categoryValidator");
const roleMiddleware = require("../middleware/roleMiddleware");

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
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  categoryValidator,
  validate,
  createCategory
);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCategory);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  categoryValidator,
  validate,
  updateCategory
);
module.exports = router;
