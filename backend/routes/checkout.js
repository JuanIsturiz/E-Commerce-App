const {
  checkoutOrder,
  checkoutOrderStripe,
} = require("../controllers/checkoutController");

const checkoutRouter = require("express").Router();

//creates an order, updates carts, cart_items and order_items
checkoutRouter.post("/cart/:cartId", checkoutOrderStripe);
checkoutRouter.post("/cart/:cartId/success", checkoutOrder);

module.exports = checkoutRouter;
