const { body } = require("express-validator");

const categoryValidator = [
  body("name")
    .trim()
    .isString()
    .withMessage("Category must be a string")
    .isLength({ min: 2 })
    .withMessage("Category should have at least 2 characters"),
];

module.exports = {
  categoryValidator,
};
