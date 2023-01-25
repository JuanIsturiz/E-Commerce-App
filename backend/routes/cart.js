const cartRouter = require("express").Router();

const {
  getCarts,
  getCartById,
  createCart,
  addItemToCart,
  removeCart,
  removeItemFromCart,
  getProductsByCart,
} = require("../controllers/cartController");

//get all carts info
cartRouter.get("/", getCarts);

//get cart info by id
cartRouter.get("/:userId", getCartById);

//create new cart
cartRouter.post("/", createCart);

//add items to cart by cartId and userId
cartRouter.post("/:cartId/user/:userId", addItemToCart);

//delete whole cart
cartRouter.delete("/:cartId", removeCart);

//delete items from given userId
cartRouter.delete("/cartItem/:id", removeItemFromCart);

//get products from given cartId
cartRouter.get("/:cartId/products", getProductsByCart);
module.exports = cartRouter;
