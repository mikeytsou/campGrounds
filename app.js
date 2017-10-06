const express = require("express");
      app = express();
      bodyParser = require("body-parser");
      mongoose = require("mongoose");
      passport = require("passport");
      LocalStrategy = require("passport-local");
      passportLocalMongoose = require("passport-local-mongoose");
      methodOverride = require("method-override");
      flash = require("connect-flash");
      // moment = require("moment");
      Campground = require("./models/campground");
      Comment = require("./models/comment");
      User = require("./models/user");
      // seedDB = require("./seeds");

// REQUIRING ROUTES
const campgroundRoutes = require("./routes/campgrounds");
      commentRoutes = require("./routes/comments");
      indexRoutes = require("./routes/index");

// APP CONFIG
mongoose.connect("mongodb://localhost/campgrounds");
app.locals.moment = require("moment"); // format date and time
app.use(express.static(`${__dirname}/public`)); // link to css stylesheet
app.use(bodyParser.urlencoded({extended: true})); // used to access Content-Type and populate req.body for middlewares
app.use(methodOverride("_method")); // allows you to use put and delete method on forms
app.use(flash()); // used for error handling
app.set("view engine", "ejs");
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
  secret: "THIS IS A SECRET",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE
app.use(function(req, res, next) {
  res.locals.currentUser = req.user; // this is used for making the currentUser variable avaible to all routes
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// ROUTE SHORTENING - these first two refactors the routes so you dont have to write them for every route on campgrounds and comments
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);


// ERROR
app.get("*", function(req, res) {
  res.send("PAGE DOES NOT EXIST");
});

// SERVER
app.listen(3000, function() {
  console.log("CONNECTED TO PORT 3000");
});