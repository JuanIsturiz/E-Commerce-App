const { checkoutOrder } = require("../controllers/checkoutController");
const pool = require("../db/dbConfig");

const checkoutRouter = require("express").Router();

//creates an order, updates carts, cart_items and order_items
checkoutRouter.post("/cart/:cartId", checkoutOrder);

module.exports = checkoutRouter;
