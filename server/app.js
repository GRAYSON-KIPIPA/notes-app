const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const notesRoutes = require("./routes/notesRoutes");
const usersRoutes = require("./routes/usersRoutes");
const categoriesRoutes = require("./routes/categoriesRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
//Middleware
app.use(express.json());
app.use(cors());

//ROUTES
app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);
app.use("/categories", categoriesRoutes);

app.use(errorMiddleware);
module.exports = app;
