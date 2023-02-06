const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");

// @desc    Gets all products
// @route   GET /products
// @access  Private
exports.getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products ORDER BY name ASC"
    );
    res.send(products.rows);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
