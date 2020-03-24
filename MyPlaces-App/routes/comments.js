const express = require("express");
const router = express.Router({ mergeParams: true });
const Campground = require("../models/campgrounds");
const Comment = require("../models/comments");
const middleWare = require('../middleware');
//  COMMENTS NEW
router.get("/new", middleWare.isLoggedIn, function(req, res) {
  // console.log(req.params.id);
  Campground.findById(req.params.id, function(error, foundCampground) {
    if (error) {
      console.log(error);
    } else {
      res.render("comments/new", { foundCampground: foundCampground });
    }
  });
});
// COMMENTS CREATE
router.post("/", middleWare.isLoggedIn, function(req, res) {
  // req.params.id;
  // LOOKUP CAMPGROUN USING ID
  Campground.findById(req.params.id, function(error, foundCampground) {
    if (error) {
      console.log(error);
      res.redirect("/campgrounds");
    } else {
      // console.log(req.body.comment);
      Comment.create(req.body.comment, function(error, createdComment) {
        if (error) {
          req.flash('error', "Comment can't be created");
          console.log(error);
        } else {
          // console.log(req.user.username);
          createdComment.author.id = req.user._id;
          createdComment.author.username = req.user.username;
          createdComment.save();
          foundCampground.comments.push(createdComment);
          foundCampground.save();
          // console.log(createdComment);
          req.flash('success', 'Comment created successfully');
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
});
// EDIT ROUTE FOR EDITING COMMENTS
router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res) {
  Comment.findById(req.params.comment_id, function(error, foundComment) {
    if (error) {
      console.log(error);
    } else {
      res.render("comments/edit", {
        foundCampground_id: req.params.id,
        comment: foundComment
      });
    }
  });
});
// COMMENTS UPDATE ROUTE
router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(
    error,
    foundComment
  ) {
    if (error) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});
// DELETE COMMENT ROUTE
router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
  Comment.findByIdAndDelete(req.params.comment_id, function(error) {
    if (error) {
      res.redirect("back");
    } else {
      req.flash('success', 'Comment deleted');
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});


module.exports = router;
