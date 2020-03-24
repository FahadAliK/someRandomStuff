const express = require("express");
const router = express.Router();
const Campground = require("../models/campgrounds");
const middleWare = require('../middleware')
// INDEX ROUTE- SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
  // console.log(req.user);
  Campground.find({}, function(error, returnedItems) {
    if (error) {
      console.log(error);
    } else {
      res.render("campgrounds/index", { campGrounds: returnedItems });
    }
  });
});
// CREATE - CAMPGROUND ADD A NEW CAMP GROUND TO DB.
router.post("/", middleWare.isLoggedIn, function(req, res) {
  const name = req.body.name;
  const url = req.body.image;
  const price = req.body.price;
  const desc = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  // req.body.campground.author = author;
  // const newcampground = {name: name, image: url};
  // console.log(req.user);
  Campground.create(
    {
      name: name,
      price: price,
      image: url,
      description: desc,
      author: author
    },
    function(error, createdCampground) {
      if (error) {
        console.log(error);
      } else {
        // console.log(createdCampground);
        res.redirect("/campgrounds");
      }
    }
  );
  // campGrounds.push(newcampground);
});
// NEW - ROUTE TO CREATE NEW CAMPGROUND
router.get("/new", middleWare.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});
// SHOW - ROUTE TO SHOW INFO ABOUT ONE CAMPGROUND
router.get("/:id", function(req, res) {
  // console.log(req.params);
  // console.log(req.params.id);
  // console.log(typeof req.params.id);
  // console.log(mongoose.isValidObjectId(req.params.id));
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(error, foundElement) {
      if (error) {
        console.log(error);
      } else {
        // console.log(foundElement);
        res.render("campgrounds/show", { campground: foundElement });
      }
    });
  // res.render('show');
});
// EDIT ROUTE - SHOWS THE FORM FOR EDITING CAMPGROUND
router.get("/:id/edit", middleWare.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(error, foundCampground) {
    res.render('campgrounds/edit', {campground: foundCampground});
  });
});
// UPDATE ROUTE - WHERE THE FORM TO BE POSTED
router.put("/:id", middleWare.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(
    error,
    updatedCampground
  ) {
    if (error) {
      res.redirect("/");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
// DELETE CAMPGROUND ROUTE
router.delete("/:id", middleWare.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(error) {
    if (error) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;
