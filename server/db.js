const { Pool } = require("pg");

//UPDATED TO
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "notes_db",
//   password: "***",
//   port: 5432,
// });
