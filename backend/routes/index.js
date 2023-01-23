const indexRouter = require("express").Router(),
  homeRouter = require("./home"),
  registerRouter = require("./register"),
  loginRouter = require("./login"),
  usersRouter = require("./users"),
  cartRouter = require("./cart"),
  ordersRouter = require("./orders"),
  productsRouter = require("./products"),
  checkoutRouter = require("./checkout"),
  logoutRouter = require("./logout");

const { isAuth, isNotAuth } = require("../middlewares/authentication");

//routes setup
indexRouter.use("/", homeRouter);
indexRouter.use("/register", registerRouter);
indexRouter.use("/login", loginRouter);
indexRouter.use("/users", usersRouter);
indexRouter.use("/cart", cartRouter);
indexRouter.use("/orders", ordersRouter);
indexRouter.use("/products", productsRouter);
indexRouter.use("/checkout", checkoutRouter);
indexRouter.use("/logout", logoutRouter);

module.exports = indexRouter;
