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

// @desc    Get product by id
// @route   GET /products/:id
// @access  Private
exports.getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.send(product.rows[0]);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Create product
// @route   POST /products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {
  const { name, qty, description, price } = req.body;
  try {
    const newProduct = await pool.query(
      "INSERT INTO products (name, stock_qty, description, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, qty, description, price]
    );
    res
      .status(201)
      .send(`new product created with an ID: ${newProduct.rows[0].id}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates product by id
// @route   PUT /products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, qty, description, price } = req.body;
  try {
    const product = await pool.query(
      "UPDATE products SET name = $1, stock_qty = $2, description = $3, price = $4 WHERE id = $5 RETURNING *",
      [name, qty, description, price, id]
    );
    res.send(product.rows[0]);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Deletes product by id
// @route   DELETE /products/:id
// @access  Private
exports.removeProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.send(`Deleted product with ID: ${id}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
