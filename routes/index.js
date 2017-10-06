const express = require("express");
      router = express.Router();
      passport = require("passport");
      User = require("../models/user");

// RESTFUL ROUTES - a mapping between HTTP routes and CRUD(CREATE, READ, UPDATE, DESTROY)

// ROOT
router.get("/", function(req, res) {
  res.render("landing");
});

// NEW -register
router.get("/register", function(req, res) {
  res.render("register", {page: "register"});
});

// CREATE -register
router.post("/register", function(req, res) {
  let newUser = new User({username: req.body.username});
  let password = req.body.password;
  User.register(newUser, password, function(err, user) {
    if (err) {
      console.log(err);
      // req.flash("error", err.message);
      return res.render("register", {error: err.message});
    }
    passport.authenticate("local")(req, res, function() {
      req.flash("success", `Welcome to CampGrounds ${user.username}`);
      res.redirect("/campgrounds");
    });
  });
});

// NEW - login
router.get("/login", function(req, res) {
  res.render("login", {page: "login"});
});

// CREATE - login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login",
  successFlash: "Welcome to CampGrounds",
  failureFlash: true
}), function(req, res) {});

// LOGOUT
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/campgrounds");
})

module.exports = router;