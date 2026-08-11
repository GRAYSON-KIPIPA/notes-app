const { decrypt } = require("dotenv");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");

    res.status(200).json({
      message: "Register user works",
      users: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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

    const user = result.rows[0];
    res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    const user = result.rows[0];

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //compare for password
    const loginTest = await bcrypt.compare(password, user.password);

    //Verify Loged in user
    if (!loginTest) {
      return res.status(400).json({
        message: "Email or password is incorect",
      });
    }

    //Create a token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "User loged in successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, getAllUsers, login };
