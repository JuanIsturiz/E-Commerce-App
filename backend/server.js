const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
const { SESSION_SECRET, PORT } = require("./config");
const cors = require("cors");

//passport initialization
require("./auth/google");
require("./auth/passport");

const indexRouter = require("./routes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");

//server setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));

// session setup
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      maxAge: 30 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    sameSite: "none",
  })
);

//cookie parser init
app.use(cookieParser(SESSION_SECRET));

//passport setup
app.use(passport.initialize());
app.use(passport.session());

//main router setup
app.use(indexRouter);

//error handler
app.use(errorHandler);

//server start
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
