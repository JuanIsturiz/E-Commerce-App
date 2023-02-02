const passport = require("passport");
const pool = require("../db/dbConfig");

exports.googleSuccess = async (req, res) => {
  const { _json } = req.user;
  const userIdQuery = await pool.query(
    "SELECT * FROM users WHERE google_id = $1",
    [_json.sub]
  );

  const user = {
    id: userIdQuery.rows[0].id,
    first: _json.given_name,
    last: _json.family_name,
    email: _json.email,
    picture: _json.picture,
  };
  res.cookie("user", JSON.stringify(user));
  res.redirect("http://localhost:3000/products");
};

// @desc    Logs user with google strategy
// @route   GET /login/google
// @access  Public
exports.loginGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});

// @desc    Logs user with google strategy
// @route   GET /login/google
// @access  Public
exports.googleCallback = passport.authenticate("google", {
  successRedirect: "/google/success",
});
