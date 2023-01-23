const { logoutUser } = require("../controllers/logoutController");

const logoutRouter = require("express").Router();

//logs out user
logoutRouter.get("/", logoutUser);

module.exports = logoutRouter;
