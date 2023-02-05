const usersRouter = require("express").Router();
const {
  getUsers,
  getUserById,
  updateUser,
  removeUser,
  updateUserPassword,
} = require("../controllers/usersController");

//gets all users
usersRouter.get("/", getUsers);

//gets user by id
usersRouter.get("/:id", getUserById);

//updates an user by id
usersRouter.put("/:id", updateUser);

//deletes an user by id
usersRouter.delete("/:id", removeUser);

usersRouter.put("/:userId/passwords", updateUserPassword);

module.exports = usersRouter;
