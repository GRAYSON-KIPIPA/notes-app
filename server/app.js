const express = require("express");
const app = express();

//Middleware
app.use(express.json());

const notes = [];
let nextId = 1;

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
    id: nextId,
    title: note.title,
    content: note.content,
  };

  notes.push(newNote);
  nextId++;
  console.log("ID: ", nextId);
  res.status(201).json({
    message: "Note created successfully",
    newNote,
    totalNotes: notes.length,
  });
});

app.get("/notes", (req, res) => {
  res.status(200).json({ notes });
});

app.get("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    res.status(404).json({
      message: "Note not found",
    });
  }

  res.status(200).json(note);
});

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  notes.splice(index, 1);

  //   const newNotes = notes.filter((note) => note.id !== id);
  res.status(200).json({
    message: "Note deleted successfully",
    totalNotes: notes.length,
  });
});

app.put("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  note.title = req.body.title;
  note.content = req.body.content;

  res.status(200).json({
    message: "Note updated successfully",
    note,
  });
});

module.exports = app;
