const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const getBaseUrl = require('../middleware/getBaseUrl')

const passport = require('passport')
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    googleId: String,
    secret: String,
    imgUrl: String,
    bio: {
        type: String,
        default: ""
    },
    major: {
        type: String,
        default: "N/A"
    },
    schedule: {
        type: [{
            _id: String,
            department: String,
            number: Number,
            professor: String,
            startTime: String,
            endTime: String,
            monday: Boolean,
            tuesday: Boolean,
            wednesday: Boolean,
            thursday: Boolean,
            friday: Boolean,
            saturday: Boolean,
            sunday: Boolean,
            lab: Boolean,
            firstHalfMod: Boolean,
            secondHalfMod: Boolean
        }],
        default: []
    },
    hideSchedule: {
        type: Boolean,
        default: false
    },
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
    callbackURL: `${getBaseUrl(false)}/auth/google/callback`,
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const newUser = {
        googleId: profile.id,
        username: profile.id,
        email: profile._json.email,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        imgUrl: profile._json.picture
    }
    
    // User.findOrCreate({username: profile.id, googleId: profile.id}, newUser, (err, user) => cb(err, user))
    let findUser;
    await User.findOne({googleId: profile.id})
        .then(res => findUser = res)

    if(!findUser){
        User.create(newUser, (err, user) => cb(err, user))
    }
    else{
        User.findOneAndUpdate({googleId: profile.id}, newUser, (err, user) => cb(err, user));
    }
  }));