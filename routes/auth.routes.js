const express   = require('express')
const router    = express.Router()
const passport  = require('passport')
const jwt       = require('jsonwebtoken')
const dotenv    = require('dotenv')
const auth      = require('../middleware/auth')
const User      = require('../models/user.model')
const axios     = require('axios')

dotenv.config()

// @route       GET auth/google
// @desc        Authenticate the user with Google OAuth
// @access      Public
router.get("/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route       GET auth/google/callback
// @desc        Creates JSON web token for user and redirects back to homepage
// @access      Public
router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }), (req, res) => {
        let minsToExp = 45;
      
        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (minsToExp * 60),
            user: req.user
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {httpOnly:false})
        res.redirect('http://localhost:3000')
  }
);

// @route       GET auth/user
// @desc        Get user data
// @access      Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user._id)
        .then(user => res.send(user))
})

// @route       GET auth/logout
// @desc        Logout user
// @access      Public
router.get("/logout", function(req, res){
    res.clearCookie("token");
    res.redirect("http://localhost:3000");
});

// @route       POST auth/groupme
// @desc        Used to store course information for groupme creation
// @access      Private
let course;
router.post('/groupme', auth, (req, res) => {
    course = req.body
    res.send(process.env.GROUP_ME_CLIENT_ID)
})


// @route       GET auth/groupme/callback
// @desc        Callback function which creates groupme after user is authenticated with GroupMe
// @access      Public
router.get('/groupme/callback', async (req, res) => {
    let groupmeId;
    let groupmeLink;
    let access_token = req.query.access_token;

    //Create groupme on user's account
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

    //Update course with the corresponding group me data
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

    res.redirect(`http://localhost:3000/course?id=${course._id}`)
})

module.exports = router;