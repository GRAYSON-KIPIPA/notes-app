const pool = require("../db");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    console.log("USERS: ", result.rows);
    res.status(200).json({
      message: "Register user works",
      users: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Username, email, password are required",
      });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid input types",
      });
    }

    const existEmail = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (existEmail.rows.length !== 0) {
      return res.status(409).json({
        message: "User Email alread Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *",
      [name, email, hashedPassword]
    );

    console.log("RESULTS: ", result.rows[0]);
    const user = result.rows[0];
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { registerUser, getAllUsers };
