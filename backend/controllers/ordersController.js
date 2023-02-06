const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");

// @desc    Get orders by userId
// @route   GET /orders/user/:userId
// @access  Private
exports.getOrdersByUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  try {
    const ordersQuery = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY deliver_date ASC",
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
});

// @desc    Updates order status
// @route   PUT /orders/:orderId/update
// @access  Private
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const modified = new Date().toISOString().split("T")[0];

  const orderQuery = await pool.query(
    "UPDATE orders SET status = $1 , modified = $2 WHERE id = $3 RETURNING *",
    [status, modified, orderId]
  );

  if (status === "Cancelled") {
    const products = await pool.query(
      "SELECT product_id, quantity FROM order_item WHERE order_id =$1",
      [orderId]
    );

    for (const product of products.rows) {
      const { quantity, product_id } = product;
      await pool.query(
        "UPDATE products SET stock_qty = stock_qty + $1 WHERE id = $2",
        [quantity, product_id]
      );
    }

    await pool.query("DELETE FROM order_item WHERE order_id = $1", [orderId]);
  }

  res.json({ id: orderQuery.rows[0].id, status: orderQuery.rows[0].status });
});
