const cartRouter = require("express").Router();

const {
  getCartById,
  createCart,
  addItemToCart,
  removeItemFromCart,
  getProductsByCart,
} = require("../controllers/cartController");

//get cart info by id
cartRouter.get("/:userId", getCartById);

//create new cart
cartRouter.post("/", createCart);

//add items to cart by cartId and userId
cartRouter.post("/:cartId/user/:userId", addItemToCart);

//delete items from given cartId and productId
cartRouter.delete("/:cartId/item/:productId", removeItemFromCart);

//get products from given cartId
cartRouter.get("/:cartId/products", getProductsByCart);

module.exports = cartRouter;
