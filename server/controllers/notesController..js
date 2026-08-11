const pool = require("../db");
// const authMiddleware = require("../middleware/authMiddleware");

//GET ALL NOTES
const getAllNotes = async (req, res, next) => {
  const userId = req.user.id;

  //Get page and limit from query params for Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  //Searching a content from notes
  const search = req.query.search || "";

  //Sorting the notes   Minimize trusting any query from the client
  const allowedSortField = ["title", "id"];
  //THEN
  const sort = allowedSortField.includes(req.query.sort)
    ? req.query.sort
    : "id";
  const order = req.query.order === "desc" ? "DESC" : "ASC";
  try {
    const result = await pool.query(
      `SELECT * FROM notes WHERE user_id=$1 AND title ILIKE $4 ORDER BY ${sort} ${order} LIMIT $2 OFFSET $3`,
      [userId, limit, offset, `%${search}%`]
    );

    const totalNotesResult = await pool.query(
      `SELECT COUNT(*) AS total FROM notes WHERE user_id=$1 AND title ILIKE $2 `,
      [userId, `%${search}%`]
    );

    const totalNotes = Number(totalNotesResult.rows[0].total);
    const totalPages = Math.ceil(totalNotes / limit);

    res.status(200).json({
      page,
      limit,
      totalNotes,
      totalPages,
      notes: result.rows,
    });
  } catch (err) {
    next(error);
  }
};

//CREATING A NOTE
const createNote = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const { title, content, category_id } = req.body;

    const modifiedCategoryId = Number(category_id);
    const result = await pool.query(
      `INSERT INTO notes(title, content, user_id, category_id) VALUES($1, $2, $3, $4) RETURNING *`,
      [title, content, userId, modifiedCategoryId]
    );

    res.status(201).json({
      message: "Note created successful",
      note: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

//GET A SINGLE NOTE
const getNote = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT * FROM notes WHERE id=$1 AND user_id=$2",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note Not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//UPDATING A NOTE
const updateNote = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }
    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2 WHERE id=$3 AND user_id=$4 RETURNING *",
      [title, content, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

//DELETE A NOTE
const deleteNote = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM notes WHERE id=$1 AND user_id=$2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Note deleted successfully",
      note: result.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllNotes, createNote, getNote, updateNote, deleteNote };
