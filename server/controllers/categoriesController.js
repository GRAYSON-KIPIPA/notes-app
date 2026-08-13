const pool = require("../db");
const AppError = require("../errors/AppError");

const getAllCategories = async (req, res, next) => {
  //   const userId = req.user.id;

  try {
    const result = await pool.query("SELECT * FROM categories");

    if (result.rows.length === 0) {
      throw new AppError("Categories not found");
    }

    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

const getSingleCategory = async (req, res, next) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query(`SELECT * FROM categories WHERE id=$1`, [
      id,
    ]);

    if (result.rows.length === 0) {
      throw new AppError("Category not found", 404);
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      "INSERT INTO categories(name) values($1) RETURNING *",
      [name]
    );
    const category = result.rows[0];
    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const result = await pool.query(
      "DELETE FROM categories WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      throw new AppError("Categories not found");
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    const result = await pool.query(
      `UPDATE categories SET name=$1 WHERE id=$2 RETURNING *`,
      [name, id]
    );

    // if (result.rows.length === 0) {
    //   return res.status(404).json({
    //     message: "Category not found",
    //   });
    // }

    if (result.rows.length === 0) {
      throw new AppError("Category not found", 404);
    }
    const category = result.rows[0];
    console.log("UPDATED: ", result.rows[0]);
    res.status(200).json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
};
