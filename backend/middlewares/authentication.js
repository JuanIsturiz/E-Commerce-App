// checks if user is authenticated
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user authenticated");
    // return res.redirect("/users/dashboard");
  }
  next();
};

// checks if user is not authenticated
const isNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user authenticated");
    return next();
  }
  console.log("user not authenticated");
  res.redirect("http://localhost:3000");
};

module.exports = {
  isAuth,
  isNotAuth,
};
