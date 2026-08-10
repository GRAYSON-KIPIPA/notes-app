const { body } = require("express-validator");

const noteValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2 })
    .withMessage("Title must have at least two characters"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 2 })
    .withMessage("A note at least have two characters"),

  body("category_id")
    .trim()
    .notEmpty()
    .withMessage("category_id is required")
    .isInt()
    .withMessage("Category ID must be an integer"),
];

module.exports = {
  noteValidation,
};
