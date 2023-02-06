const usersRouter = require("express").Router();
const { updateUserPassword } = require("../controllers/usersController");

//updates user password
usersRouter.put("/:userId/passwords", updateUserPassword);

module.exports = usersRouter;
