const express       = require('express')
const router        = express.Router()
const passport      = require('passport')
const jwt           = require('jsonwebtoken')
const dotenv        = require('dotenv')
const auth          = require('../middleware/auth')
const getBaseUrl    = require('../middleware/getBaseUrl')
const User          = require('../models/user.model')
const Course        = require('../models/course.model')
const axios         = require('axios')

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
    passport.authenticate("google", { failureRedirect: `${getBaseUrl()}`}), (req, res) => {
        let minsToExp = 90;
      
        let token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (minsToExp * 60),
            user: req.user
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {httpOnly:false})
        res.redirect(`${getBaseUrl()}`)
  }
);

// @route       GET auth/user
// @desc        Get user data
// @access      Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user._id)
        .then(user => res.send(user))
})

// @route       GET auth/exp
// @desc        Get token expiration time
// @access      Public
router.get('/exp', (req, res) => {
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({msg: "Access denied. No token provided"})
    }
    try{
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET)
        let exp = decodedUser.exp
        let timeRemaining = Math.floor(exp - Date.now()/1000)
        res.json({exp: timeRemaining})
    }catch(err){
        res.clearCookie("token")
        res.status(400).send("Token is not valid")
    }
})

// @route       GET auth/logout
// @desc        Logout user
// @access      Public
router.get("/logout", function(req, res){
    res.clearCookie("token");
    res.redirect(`${getBaseUrl()}`);
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
            name: `${course.department} ${course.number}${course.lab ? "L" : ""} - ${course.professor}`,
            description: `This is the course groupme for ${course.department} ${course.number}${course.lab ? "L" : ""}`,
            share: true
        }
    })
        .then(res => {
            groupmeId = res.data.response.id
            groupmeLink = res.data.response.share_url
        })
        .catch(err => console.log(err))

    await Course.findByIdAndUpdate(course._id, {
        groupme: {
            id: groupmeId,
            share_url: groupmeLink
        }
    })
        .catch(err => res.send(err))

    res.redirect(`${getBaseUrl()}/course?id=${course._id}`)
})

module.exports = router;