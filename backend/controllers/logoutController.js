// @desc    Logs out user
// @route   GET /logout
// @access  Private
exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    console.log("user logged out..");
    res.redirect("/");
  });
};
