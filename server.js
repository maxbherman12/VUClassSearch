const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const jwt = require('jsonwebtoken')


const app = express();

dotenv.config();

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect(process.env.MONGO_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => { console.log("Successfully connected to Mongo DB")})
    .catch(err => { console.log (`Database error: ${err}`)})

mongoose.set('returnOriginal', false)

//use built in body parser
app.use(express.json());

//allow cross origin resource sharing
app.use(cors())

//auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    let minsToExp = 60;
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (minsToExp * 60),
      user: req.user
    }, 'secret')

    res.cookie("token", token, {httpOnly:false})
    res.redirect('http://localhost:3000')    
    //OLD sending via url param
    //const redirectUrl = `http://localhost:3000?id=${req.user.googleId}`
    //res.redirect(redirectUrl);
  });

app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000");
});

//use routes
const usersRoutes = require('./routes/users.routes');
app.use('/api/users', usersRoutes);
const coursesRoutes = require('./routes/courses.routes');
app.use('/api/courses', coursesRoutes);

//set port and listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server listening on port ${port}`));