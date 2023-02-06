const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const pool = require("../db/dbConfig");

// @desc    Main register endpoint
// @route   GET /register
// @access  Public
exports.getRegister = (req, res) => {
  res.send("/register GET request received!");
};

// @desc    Creates and register user
// @route   POST /register
// @access  Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { first, last, email, password, password2 } = req.body;

  if (password !== password2) {
    res.status(400);
    throw new Error("passwords doesn't match.");
  }

  if (!email || !password) {
    res.status(400);
    throw new Error("password or user missing.");
  }
  if (password.length < 5) {
    res.status(400);
    throw new Error("password length too short.");
  }

  try {
    const { rowCount } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (rowCount > 0) {
      res.status(401);
      throw new Error("Email already taken.");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const { rows } = await pool.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, hashedPass, first, last]
    );
    const user = rows[0];
    res.status(201).json({
      id: user.id,
      first: user.first_name,
      last: user.last_name,
      email: user.email,
    });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
