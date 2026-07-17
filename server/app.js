const express = require("express");
const app = express();

//Middleware
app.use(express.json());

const notes = [];
//Routes
app.get("/", function (req, res) {
  res.send("Welcome to NOTES-API");
});

app.post("/notes", (req, res) => {
  const note = req.body;

  if (!note.title || !note.content) {
    return res.status(400).json({
      message: "Title and content are required.",
    });
  }
  //   console.log(note);

  // Add note

  const newNote = {
    id: notes.length + 1,
    title: note.title,
    content: note.content,
  };
  notes.push(newNote);

  console.log("New Notes", notes);

  res.status(201).json({
    message: "Note created successfully",
    newNote,
    totalNotes: notes.length,
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({ notes });
});

module.exports = app;
