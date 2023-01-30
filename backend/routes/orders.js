const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  updateOrder,
  cancelOrder,
  getOrdersByUser,
} = require("../controllers/ordersController");

//gets all orders
ordersRouter.get("/", getAllOrders);

//gets orders by id
ordersRouter.get("/:id", getOrderById);

//updates order by id
ordersRouter.put("/:id", updateOrder);

//deletes order by id
ordersRouter.delete("/:id/cancel", cancelOrder);

ordersRouter.get("/user/:userId", getOrdersByUser);

module.exports = ordersRouter;
