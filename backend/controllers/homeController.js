// @desc    Main home endpoint
// @route   GET /
// @access  Public
exports.getHome = (req, res) => {
  res.send("/home GET request received!");
};
