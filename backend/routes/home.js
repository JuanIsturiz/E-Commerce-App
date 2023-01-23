const { getHome } = require("../controllers/homeController");

const homeRouter = require("express").Router();

//main home route
homeRouter.get("/", getHome);

module.exports = homeRouter;
