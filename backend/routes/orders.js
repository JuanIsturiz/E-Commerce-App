const ordersRouter = require("express").Router();
const {
  getOrdersByUser,
  updateOrderStatus,
} = require("../controllers/ordersController");

//gets all user orders
ordersRouter.get("/user/:userId", getOrdersByUser);

//updates order status by id
ordersRouter.put("/:orderId/update", updateOrderStatus);

module.exports = ordersRouter;
