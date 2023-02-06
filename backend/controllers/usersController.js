const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const pool = require("../db/dbConfig");

// @desc    Updates user password
// @route   PUT /users/:userId/passwords
// @access  Private
exports.updateUserPassword = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { password, password2 } = req.body;
  if (!password || !password2) {
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
