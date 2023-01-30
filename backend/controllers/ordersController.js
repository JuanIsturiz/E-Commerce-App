const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");

// @desc    Gets all orders
// @route   GET /orders
// @access  Private
exports.getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.send(orders.rows);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Gets order by id
// @route   GET /orders/:id
// @access  Private
exports.getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    res.send(order.rows[0]);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Updates order by id
// @route   PUT /orders/:id
// @access  Private
exports.updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  try {
    const order = await pool.query(
      "UPDATE orders SET status = $1, modified = $2 WHERE id = $3 RETURNING *",
      [status, modified, id]
    );
    if (order.rows[0].status === "cancelled") {
      res.redirect(`/orders/cancel/${id}`);
    } else {
      res.redirect("/orders");
    }
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Deletes order by id
// @route   DELETE /orders/:id/cancel
// @access  Private
exports.cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      "SELECT quantity, product_id FROM order_item WHERE order_id = $1",
      [id]
    );

    for (const product of rows) {
      const { quantity, product_id } = product;
      await pool.query(
        "UPDATE products SET stock_qty = stock_qty + $1 WHERE id = $2",
        [quantity, product_id]
      );
    }

    await pool.query("DELETE FROM order_item WHERE order_id = $1", [id]);
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.send(`Deleted order with ID: ${id}`);
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

// @desc    Get orders by userId
// @route   GET /orders/user/:userId
// @access  Private
exports.getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const ordersQuery = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1",
      [userId]
    );
    const orders = ordersQuery.rows;

    for (const order of orders) {
      const { id } = order;
      const itemsQuery = await pool.query(
        "SELECT * FROM order_item WHERE order_id = $1",
        [id]
      );
      const items = itemsQuery.rows;

      for (const item of items) {
        const { product_id } = item;
        const itemQuery = await pool.query(
          "SELECT * FROM products WHERE id = $1",
          [product_id]
        );
        const product = itemQuery.rows[0];
        item.product = product;
      }
      order.items = items;
    }
    res.json({ orders });
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
};
