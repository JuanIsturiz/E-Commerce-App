const { session } = require("passport");
const passport = require("passport");

exports.loginSuccess = (req, res) => {
  const { user } = req;
  session.user = user;
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
exports.loginUser = passport.authenticate("local", {
  // successRedirect: "/login/succes",
  // failureRedirect: "/login",
});
