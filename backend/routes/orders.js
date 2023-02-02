const ordersRouter = require("express").Router();
const {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  cancelOrder,
  updateOrderStatus,
} = require("../controllers/ordersController");

//gets all orders
ordersRouter.get("/", getAllOrders);

//gets orders by id
ordersRouter.get("/:id", getOrderById);

//updates order by id
ordersRouter.put("/:id", updateOrder);

//deletes order by id
ordersRouter.delete("/:id/delete", deleteOrder);

//gets all user orders
ordersRouter.get("/user/:userId", getOrdersByUser);

//updates order status by id
ordersRouter.put("/:orderId/update", updateOrderStatus);

module.exports = ordersRouter;
