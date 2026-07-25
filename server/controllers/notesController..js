const pool = require("../db");

//GET ALL NOTES
const getAllNotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

//CREATING A NOTE
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const result = await pool.query(
      "INSERT INTO notes(title, content) VALUES($1, $2) RETURNING *",
      [title, content]
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

    const result = await pool.query("SELECT * FROM notes WHERE id=$1", [id]);

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
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }
    const result = await pool.query(
      "UPDATE notes SET title=$1, content=$2 WHERE id=$3 RETURNING *",
      [title, content, id]
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

    const result = await pool.query(
      "DELETE FROM notes WHERE id=$1 RETURNING *",
      [id]
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
