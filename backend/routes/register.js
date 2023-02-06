const registerRouter = require("express").Router();
const {
  getRegister,
  registerUser,
} = require("../controllers/registerController");

//main register endpoint
registerRouter.get("/", getRegister);

//adds user to database
registerRouter.post("/", registerUser);

module.exports = registerRouter;
