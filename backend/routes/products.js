const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/productsController");

const productsRouter = require("express").Router();

//gets all products
productsRouter.get("/", getProducts);

//gets product by id
productsRouter.get("/:id", getProductById);

//adds a product to database
productsRouter.post("/", createProduct);

//updates a product by id
productsRouter.put("/:id", updateProduct);

//deletes a product by id
productsRouter.delete("/:id", removeProduct);

module.exports = productsRouter;
