const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const pool = require("../db/dbConfig");

// @desc    Gets all users
// @route   GET /user
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.send(users.rows);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get user by id
// @route   GET /user/:id
// @access  Private
exports.getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id =$1", [id]);
    res.send(user.rows[0]);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates user by id
// @route   PUT /user/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { first, last } = req.body;

  const cases = {
    1: {
      query: "UPDATE users SET first_name = $1 WHERE id = $2 RETURNING *",
      values: [first, id],
    },
    2: {
      query: "UPDATE users SET last_name = $1 WHERE id = $2 RETURNING *",
      values: [last, id],
    },
    3: {
      query:
        "UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *",
      values: [first, last, id],
    },
  };

  try {
    if (first && !last) {
      await pool.query(cases[1].query, cases[1].values);
      res.send(`user updated, new values ${first}`);
    }
    if (!first && last) {
      await pool.query(cases[2].query, cases[2].values);
      res.send(`user updated, new values ${last}`);
    }
    if (first && last) {
      await pool.query(cases[3].query, cases[3].values);
      res.send(`user updated, new values ${first} | ${last}`);
    }
    res.redirect(`/user/${id}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Deletes user by id
// @route   DELETE /user/:id
// @access  Private
exports.removeUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.send(`Deleted user with ID: ${id}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates user password
// @route   PUT /users/:userId/passwords
// @access  Private
exports.updateUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { password, password2 } = req.body;
  if (!password || !password2) {
    clg;
    res.status(401);
    throw new Error("Please supply both passwords");
  }
  if (password !== password2) {
    res.status(401);
    throw new Error("Passwords doesn't match, please try again");
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updateQuery = await pool.query(
      "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
      [hashedPassword, userId]
    );
    const check = !!updateQuery.rowCount;
    res.json({ check });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
