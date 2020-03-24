const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
userSchema.plugin(passportLocalMongoose);
// CREATE MODEL FROM USER SCHEMA
//   const User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);