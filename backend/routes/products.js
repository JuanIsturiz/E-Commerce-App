const { getProducts } = require("../controllers/productsController");

const productsRouter = require("express").Router();

//gets all products
productsRouter.get("/", getProducts);

module.exports = productsRouter;
