const { loginUser, loginSuccess } = require("../controllers/loginController");

const loginRouter = require("express").Router();

//logs user with passport
loginRouter.post("/", loginUser, loginSuccess);

module.exports = loginRouter;
