const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require("express-session");
const passport = require("passport");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const axios = require('axios')

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

app.use(cookieParser())

//allow cross origin resource sharing
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//auth routes
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    let minsToExp = 30;
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (minsToExp * 60),
      user: req.user
    }, 'secret')
    res.cookie("token", token, {httpOnly:false})
    res.redirect('http://localhost:3000')
});

let course;
app.post('/groupme/auth', (req, res) => {
    course = req.body
    res.send(process.env.GROUP_ME_CLIENT_ID)
})

app.get('/groupme/callback', async (req, res) => {
    let groupmeId;
    let groupmeLink;
    let access_token = req.query.access_token;

    await axios({
        method: "POST",
        url: `https://api.groupme.com/v3/groups?token=${access_token}`,
        data: {
            name: `${course.department} ${course.number} - ${course.professor}`,
            description: `This is the course group me for ${course.department} ${course.number}`,
            share: true
        }
    })
        .then(res => {
            groupmeId = res.data.response.id
            groupmeLink = res.data.response.share_url
        })
        .catch(err => console.log(err))

    await axios({
        method: "PUT",
        url: `http://localhost:8080/api/courses/${course._id}`,
        data: {
            groupme: {
                id: groupmeId,
                share_url: groupmeLink
            }
        }
    })
        .catch(err => console.log(err))

    const token = req.cookies.token;

    if(!token){
        res.status(401).send("Access denied. No token provided")
    }

    let decodedUser;
    try{
        decodedUser = await jwt.verify(token, "secret");
    }catch(err){
        res.redirect("http://localhost:3000")
        res.clearCookie("token")
        res.status(401).send(err.message)
    }

    await axios({
        method: "PUT",
        url: `http://localhost:8080/api/users/${decodedUser.user._id}/addgroupme/${groupmeId}`
    })

    res.redirect(`http://localhost:3000/course?id=${course._id}`)
})

app.get('/authByToken', (req, res) => {
    const token = req.cookies.token;

    if(!token){
        res.status(401).send("Access denied. No token provided")
    }
    try{
        const decodedUser = jwt.verify(token, "secret");
        res.send(decodedUser)
    }catch(err){
        res.redirect("http://localhost:3000")
        res.clearCookie("token")
        res.status(401).send(err.message)
    }
})

app.get("/logout", function(req, res){
    res.clearCookie("token");
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