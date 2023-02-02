const {
  loginGoogle,
  googleCallback,
  googleSuccess,
} = require("../controllers/googleController");

const googleRouter = require("express").Router();

//logs user with google
googleRouter.get("/", loginGoogle);

//google callback uri
googleRouter.get("/callback", googleCallback);

//google success redirect
googleRouter.get("/success", googleSuccess);

module.exports = googleRouter;
