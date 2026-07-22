const express = require("express");
const app = express();
const pool = require("./db");

//Middleware
app.use(express.json());

// const notes = [];
// let nextId = 1;

//Routes
app.get("/", function (req, res) {
  res.send("Welcome to NOTES-API");
});

app.get("/notes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

//ADD A NOTE
app.post("/notes", async (req, res) => {
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
});

//GET A SINGLE NOT BY ID
app.get("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("SELECT * FROM notes WHERE id=$1", [id]);

  if (!result.rows.length) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json(result.rows[0]);
});

// UPDATE A NOTE
app.put("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and Content are required",
    });
  }

  const result = await pool.query(
    "UPDATE notes SET title= $1, content = $2 WHERE id= $3 RETURNING *",
    [title, content, id]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Note not found",
    });
  }
  res.status(200).json({
    message: "Note updated successful",
    note: result.rows[0],
  });
});

//DELETE A NOTE
app.delete("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);

  const result = await pool.query("DELETE FROM notes WHERE id=$1 RETURNING *", [
    id,
  ]);

  if (result.rows.length === 0) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json({
    message: "Note deleted successful",
    note: result.rows[0],
  });
});

module.exports = app;

//BEFORE DATABASE
// app.post("/notes", (req, res) => {
//   const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({
//       message: "Title and content are required.",
//     });
//   }

//   // Add note
//   const newNote = {
//     id: nextId,
//     title,
//     content,
//   };

//   notes.push(newNote);
//   nextId++;
//   console.log("ID: ", nextId);
//   res.status(201).json({
//     message: "Note created successfully",
//     newNote,
//     totalNotes: notes.length,
//   });
// });

// app.get("/notes", (req, res) => {
//   res.status(200).json({ notes });
// });

// app.get("/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const note = notes.find((note) => note.id === id);

//   if (!note) {
//     return res.status(404).json({
//       message: "Note not found",
//     });
//   }

//   res.status(200).json(note);
// });

//UPDATE A NOTE
// app.put("/notes/:id", (req, res) => {
//   const id = Number(req.params.id);

//   const note = notes.find((note) => note.id === id);

//   if (!note) {
//     return res.status(404).json({
//       message: "Note not found",
//     });
//   }

//   const { title, content } = req.body;

//   if (!title || !content) {
//     return res.status(400).json({
//       message: "Title and content are required",
//     });
//   }

//   note.title = title;
//   note.content = content;

//   res.status(200).json({
//     message: "Note updated successfully",
//     note,
//   });
// });

//DELETE A NOTE
// app.delete("/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const index = notes.findIndex((note) => note.id === id);

//   if (index === -1) {
//     return res.status(404).json({
//       message: "Note not found",
//     });
//   }

//   notes.splice(index, 1);

//   //   const newNotes = notes.filter((note) => note.id !== id);
//   res.status(200).json({
//     message: "Note deleted successfully",
//     totalNotes: notes.length,
//   });
// });
