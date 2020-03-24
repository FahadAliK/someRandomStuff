// REQUIRING PACKAGES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const Campground = require("./models/campgrounds");
const Comment = require("./models/comments");
const seedDB = require("./seeds");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/users");
const methodOverride = require("method-override");
// REQUIRING ROUTES
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes = require("./routes/index");
const commentRoutes = require("./routes/comments");
// CONFIGURATIONS
// seedDB();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true
});
app.use(methodOverride("_method"));
app.use(flash());
// PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "SECRET SENTENCE",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Campground.create({
//     name: 'camp side 1',
//     image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80',
//     description: 'Some description of new camp ground.!!',
// }, function(error, returedItem) {
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(returedItem);
//     }
// });

// let campGrounds = [
//     {name: 'camp side 1', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
//     {name: 'camp side 2', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
//     {name: 'camp side 3', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
//     {name: 'camp side 4', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
//     {name: 'camp side 5', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
//     {name: 'camp side 6', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=349&q=80'},
// ];
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function() {
  console.log("Serving at port 3000.!!");
});
