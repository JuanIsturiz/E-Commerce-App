const {
  checkoutOrder,
  checkoutOrderStripe,
} = require("../controllers/checkoutController");
const pool = require("../db/dbConfig");

const checkoutRouter = require("express").Router();

//creates an order, updates carts, cart_items and order_items
// checkoutRouter.post("/cart/:cartId", checkoutOrder);
checkoutRouter.get("/test", (req, res) => {
  res.json({ msg: "test!" });
});
checkoutRouter.post("/cart/:cartId", checkoutOrderStripe);

module.exports = checkoutRouter;
