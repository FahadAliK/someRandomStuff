// IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");
// CONFIGURATIONS
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/blog");
app.use(methodOverride("_method"));
app.use(expressSanitizer());
// DEFINING SCHEMA
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now() }
});
// COMPILING MODEL FROM SCHEMA
const Blog = mongoose.model("Blog", blogSchema);
// CREATING ONE TEST BLOG FOR TESTING
// Blog.create({
//     title: 'A test String',
//     image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80',
//     body: 'test',
// });
// RESTFULL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});
// INDEX ROUTE
app.get("/blogs", function(req, res) {
  Blog.find({}, function(error, returnedItems) {
    if (error) {
      console.log(error);
    } else {
      res.render("index", { blogs: returnedItems });
    }
  });
});
// NEW ROUTE
app.get("/blogs/new", function(req, res) {
  res.render("new");
});
// CREATE ROUTE
app.post("/blogs", function(req, res) {
  // CREATE BLOG THEN REDIRECT TO INDEX PAGE
  // console.log(req.body);
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // console.log('==============');
  console.log(req.body);
  Blog.create(req.body.blog, function(error, returnedItem) {
    if (error) {
      // console.log(error);
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});
// SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(error, returnedItem) {
    if (error) {
      res.redirect("/blogs");
    } else {
      res.render("show", { foundBlog: returnedItem });
    }
  });
});
// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
  // console.log(req.params.id);
  Blog.findById(req.params.id, function(error, returnedItem) {
    if (error) {
      res.redirect("/blogs");
    } else {
      res.render("edit", { foundBlog: returnedItem });
    }
  });
});

// UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
  // console.log(req.params.id);
  // res.send(' UPDATE ROUTE.');
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(
    error,
    returnedItem
  ) {
    if (error) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

// DELETE ROUTE

app.delete("/blogs/:id", function(req, res) {
  // console.log(req.params.id);
  // res.send('DELET ROUTE>!!');
  Blog.findByIdAndRemove(req.params.id, function(error) {
    if (error) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function() {
  console.log("Serving on port 3000.!!");
});
