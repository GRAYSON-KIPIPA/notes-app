const express = require("express");
const app = express();
const pool = require("./db");
const notesRoutes = require("./routes/notesRoutes");
const usersRoutes = require("./routes/usersRoutes");
//Middleware
app.use(express.json());

//ROUTES
app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);
module.exports = app;
