const passport = require("passport");

exports.loginSuccess = (req, res) => {
  if (req.error) {
    res.status(401);
    throw new Error(req.error);
  }
  const { user } = req;
  res.json({
    id: user.id,
    first: user.first_name,
    last: user.last_name,
    email: user.email,
  });
};

// @desc    Logs user with passport.js
// @route   POST /login
// @access  Public
exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      req.error = err;
      return next();
    }
    if (info) {
      req.error = info.message;
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);
};
