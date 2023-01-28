const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");
const { STRIPE_SECRET } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET);

// @desc    Creates an order
// @route   POST /checkout/cart/:cartId
// @access  Private
exports.checkoutOrder = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const { deliver_date, total, status, user_id, products } = req.body;
  const modified = new Date().toISOString().split("T")[0];
  try {
    const newOrder = await pool.query(
      "INSERT INTO orders (deliver_date, total, status, modified, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [deliver_date, total, status, modified, user_id]
    );

    for (const product of products) {
      const { id, qty, price } = product;

      await pool.query(
        "DELETE FROM cart_items WHERE product_id = $1 AND cart_id = $2",
        [id, cartId]
      );

      const cartCheck = await pool.query(
        "SELECT * FROM cart_items WHERE cart_id = $1",
        [cartId]
      );

      if (!cartCheck.rowCount) {
        await pool.query("DELETE FROM carts WHERE id = $1", [cartId]);
      }

      await pool.query(
        "INSERT INTO order_item (quantity, price, order_id, product_id) VALUES ($1, $2, $3, $4)",
        [qty, price, newOrder.rows[0].id, id]
      );
      await pool.query(
        "UPDATE products SET stock_qty = stock_qty - $1 WHERE id = $2",
        [qty, id]
      );
    }
    res
      .status(201)
      .send(
        `Order placed by user: ${user_id} with a total: ${newOrder.rows[0].total}`
      );
  } catch (err) {
    res.status(500);
    throw new Error(err.message);
  }
});

exports.checkoutOrderStripe = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: "payment",
    success_url: "http://localhost:3000/checkout/success",
    cancel_url: "http://localhost:3000/checkout/cancel",
  });

  res.json({ url: session.url });
});
