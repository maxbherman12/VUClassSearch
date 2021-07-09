const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passport = require('passport')
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const {Course, CourseSchema} = require('./course.model');
const { propfind } = require('../routes/users.routes');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    googleId: String,
    secret: String,
    imgUrl: String,
    schedule: [String],
    dateReg: {
        type: Date,
        default: Date.now
    }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = User = mongoose.model('user', UserSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    const newUser = {
        googleId: profile.id,
        email: profile._json.email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        imgUrl: profile._json.picture
    }

    User.findOrCreate(newUser, (err, user) => cb(err, user));
  }));