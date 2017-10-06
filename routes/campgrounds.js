const express = require("express");
      router = express.Router();
      Campground = require("../models/campground");
      middleware = require("../middleware/index");
      geocoder = require("geocoder");


// INDEX
router.get("/", function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if (err) {
      console.log(err);
    }else {
      res.render("campgrounds/index", {campgrounds: campgrounds, page: "campgrounds"}); // this currentUser variable can be deleted because we created a middleware for it above // look at header partial for page reference
    }
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let price = req.body.price;
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  // GOOGLE MAPS SETUP
  geocoder.geocode(req.body.location, function(err, data) {
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let location = data.results[0].formatted_address;
    let newCampground = {
      name: name,
      image: image,
      description: description,
      price: price,
      author: author,
      location: location,
      lat: lat,
      lng: lng
    }
    Campground.create(newCampground, function(err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        console.log(newlyCreated);
        res.redirect("/campgrounds");
      }
    });
  });
});

// SHOW
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      console.log("#######################");
      console.log(req.user);
      console.log(foundCampground.author.id);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  // GOOGLE MAPS SETUP
  geocoder.geocode(req.body.campground.location, function(err, data) {
    let lat = data.results[0].geometry.location.lat;
    let lng = data.results[0].geometry.location.lng;
    let location = data.results[0].formatted_address;
    let newData = {
      name: req.body.campground.name,
      image: req.body.campground.image,
      description: req.body.campground.description,
      price: req.body.campground.price,
      location: location,
      lat: lat,
      lng: lng
    }
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground) {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/campgrounds");
      } else {
        req.flash("success", "Campground updated");
        res.redirect(`/campgrounds/${req.params.id}`);
      }
    });
  });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground deleted");
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;