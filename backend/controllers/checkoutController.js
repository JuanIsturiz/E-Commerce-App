const asyncHandler = require("express-async-handler");
const pool = require("../db/dbConfig");
const { STRIPE_SECRET } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET);

// @desc    Creates an order
// @route   POST /checkout/cart/:cartId
// @access  Private
exports.checkoutOrder = asyncHandler(async (req, res) => {
  const { cartId } = req.params;
  const { deliverDate, total, userId, products } = req.body;
  const status = "Pending";
  const modified = new Date().toISOString().split("T")[0];
  try {
    const newOrder = await pool.query(
      "INSERT INTO orders (deliver_date, total, status, modified, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [deliverDate, total, status, modified, userId]
    );

    for (const product of products) {
      const { product_id, quantity, product_price } = product;

      await pool.query(
        "DELETE FROM cart_items WHERE product_id = $1 AND cart_id = $2",
        [product_id, cartId]
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
        [quantity, product_price, newOrder.rows[0].id, product_id]
      );
      await pool.query(
        "UPDATE products SET stock_qty = stock_qty - $1 WHERE id = $2",
        [quantity, product_id]
      );
    }
    res.status(201).json({ order: newOrder.rows[0] });
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
    success_url: "http://localhost:3000/checkout/cart/success",
    cancel_url: `http://localhost:3000/cart/${cartId}`,
  });

  res.json({ url: session.url });
});
