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
app.use("/api/v1/notes", notesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/categories", categoriesRoutes);

app.use(errorMiddleware);
module.exports = app;
