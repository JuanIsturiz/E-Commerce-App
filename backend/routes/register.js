const registerRouter = require("express").Router();
const {
  getRegister,
  registerUser,
} = require("../controllers/registerController");
const { isAuth } = require("../middlewares/authentication");

//main register endpoint
registerRouter.get("/", isAuth, getRegister);

//adds user to database
registerRouter.post("/", registerUser);

module.exports = registerRouter;
