const { loginUser, loginSuccess } = require("../controllers/loginController");
const { isAuth } = require("../middlewares/authentication");

const loginRouter = require("express").Router();

//success log in

//logs user with passport
loginRouter.post("/", loginUser, loginSuccess);

module.exports = loginRouter;
