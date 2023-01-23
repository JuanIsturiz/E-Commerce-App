const cartRouter = require("express").Router();

const {
  getCarts,
  getCartById,
  createCart,
  addItemToCart,
  removeCart,
  removeItemFromCart,
} = require("../controllers/cartController");

//get all carts info
cartRouter.get("/", getCarts);

//get cart info by id
cartRouter.get("/:cartId", getCartById);

//create new cart
cartRouter.post("/", createCart);

//add items to cart by cartId and userId
cartRouter.post("/:cartId/users/:userId", addItemToCart);

//delete whole cart
cartRouter.delete("/:cartId", removeCart);

//delete items from given userId
cartRouter.delete("/cartItem/:id", removeItemFromCart);

module.exports = cartRouter;
