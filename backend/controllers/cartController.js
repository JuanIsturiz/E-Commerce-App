const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");

// @desc    Get carts data
// @route   GET /cart
// @access  Private
exports.getCarts = asyncHandler(async (req, res) => {
  try {
    const carts = await pool.query("SELECT * FROM carts");
    res.send(carts.rows);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get cart data by id
// @route   GET /cart/:userId
// @access  Private
exports.getCartById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1",
      [userId]
    );
    res.send(cart.rows);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Create cart
// @route   POST /cart
// @access  Private
exports.createCart = asyncHandler(async (req, res) => {
  const created = new Date().toISOString().split("T")[0];
  const { userId } = req.body;
  try {
    const check = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1",
      [userId]
    );

    if (check.rowCount > 0) {
      return;
    }

    const cart = await pool.query(
      "INSERT INTO carts (created) VALUES ($1) RETURNING *",
      [created]
    );
    res.json({ id: cart.rows[0].id });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Add new item to cart
// @route   POST /cart/:cartId/user/:userId
// @access  Private
exports.addItemToCart = asyncHandler(async (req, res) => {
  const { cartId, userId } = req.params;
  const { quantity, productId } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    await pool.query("UPDATE carts SET modified = $1 WHERE id = $2", [
      modified,
      cartId,
    ]);

    const newItem = await pool.query(
      "INSERT INTO cart_items (quantity, modified, user_id, product_id, cart_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [quantity, modified, userId, productId, cartId]
    );
    res.send(newItem.rows[0]);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Delete cart
// @route   DELETE /cart/:cartId
// @access  Private
exports.removeCart = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  try {
    await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
    res.send(`Deleted cart with ID: ${cartId}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Delete item from given cart
// @route   DELETE /cart/:cartId/item/:productId
// @access  Private
exports.removeItemFromCart = asyncHandler(async (req, res) => {
  const { cartId, productId } = req.params;
  try {
    await pool.query(
      "DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2 RETURNING *",
      [cartId, productId]
    );
    const product = await pool.query(
      "SELECT id, name FROM products WHERE id = $1",
      [productId]
    );
    res.json({ id: product.rows[0].id, name: product.rows[0].name });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get products from given Cart ID
// @route   GET /cart/:cartId/products
// @access  Private
exports.getProductsByCart = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  try {
    const products = await pool.query(
      "SELECT products.id AS product_id, products.name AS product_name, products.description AS product_description, cart_items.quantity AS quantity FROM products, cart_items WHERE products.id = cart_items.product_id AND cart_items.cart_id = $1 ORDER BY products.id",
      [cartId]
    );
    res.json({ products: products.rows });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});
