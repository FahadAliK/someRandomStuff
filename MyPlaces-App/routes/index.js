const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/users");
// ROOT ROUTE
router.get("/", function(req, res) {
  res.render("landing");
});
// SHOW SIGN UP FORM ROUTE
router.get("/signup", function(req, res) {
  res.render("signup");
});
// SIGN UP LOGIC HANDLE ROUTE
router.post("/signup", function(req, res) {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(error, user) {
    if (error) {
      req.flash("error", error.message);
      // console.log(typeof error.message);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to Yelpcamp " + user.username);
      res.redirect("/campgrounds");
    });
  });
});
// LOGIN FORM ROUTE
router.get("/login", function(req, res) {
  res.render("login");
});
// LOGIN LOGIC HANDLE ROUTE
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }),
  function(req, res) {}
);
// LOGOUT ROUTES
router.get("/logout", function(req, res) {
  req.logOut();
  req.flash("success", "Logged You Out.!");
  res.redirect("/campgrounds");
});

module.exports = router;
