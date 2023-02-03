const {
  checkoutOrder,
  checkoutOrderStripe,
} = require("../controllers/checkoutController");

const checkoutRouter = require("express").Router();

//creates an order, updates carts, cart_items and order_items
checkoutRouter.post("/cart/:cartId/stripe", checkoutOrderStripe);
checkoutRouter.post("/cart/:cartId/create", checkoutOrder);

module.exports = checkoutRouter;
