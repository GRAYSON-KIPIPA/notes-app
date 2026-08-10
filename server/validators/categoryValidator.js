const { body } = require("express-validator");

const categoryValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Category must be a string")
    .isLength({ min: 2 })
    .withMessage("Category should have at least 2 characters"),
];

module.exports = {
  categoryValidator,
};
