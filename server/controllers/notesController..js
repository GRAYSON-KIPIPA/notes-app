const pool = require("../db");
// const authMiddleware = require("../middleware/authMiddleware");

//GET ALL NOTES
const getAllNotes = async (req, res) => {
  const userId = req.user.id;

  //Get page and limit from query params for Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await pool.query(
      "SELECT * FROM notes WHERE user_id=$1 LIMIT $2 OFFSET $3",
      [userId, limit, offset]
    );

    const totalNotesResult = await pool.query(
      "SELECT COUNT(*) AS total FROM notes WHERE user_id=$1",
      [userId]
    );

    const totalNotes = Number(totalNotesResult.rows[0].total);
    const totalPages = Math.ceil(totalNotes / limit);

    res.status(200).json({
      page: page,
      limit: limit,
      totalNotes: Notes,
      totalPages: totalPages,
      note: result.rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

//CREATING A NOTE
const createNote = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO notes(title, content, user_id) VALUES($1, $2, $3) RETURNING *",
      [title, content, userId]
    );

    res.status(201).json({
      message: "Note created successful",
      note: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//GET A SINGLE NOTE
const getNote = async (req, res) => {
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
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//UPDATING A NOTE
const updateNote = async (req, res) => {
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
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

//DELETE A NOTE
const deleteNote = async (req, res) => {
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
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { getAllNotes, createNote, getNote, updateNote, deleteNote };
