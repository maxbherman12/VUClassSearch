const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/auth')
const User          = require('../models/user.model')
const Course        = require('../models/course.model')

// @route       GET api/users
// @desc        Get all users
// @access      Public
router.get('/', (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(400).send(err))
});

// @route       GET api/users/:id
// @desc        Get user by id
// @access      Public
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.send(user)})
        .catch(err => res.status(401).send(err))
})

// @route       POST api/users
// @desc        Create a new user
// @access      Public
router.post('/', (req, res) => {
    User.create(req.body)
        .then(newUser => { res.send(newUser) })
        .catch(err => res.status(401).send(err))
})

// @route       PUT api/users/:id
// @desc        Update a user by id
// @access      Public
router.put('/', auth, (req, res) => {
    User.findByIdAndUpdate(req.user.user._id, req.body)
        .then(updatedUser => res.send(updatedUser))
        .catch(err => res.status(401).send(err))
})

// @route       PUT api/users/push2schedule/:courseId
// @desc        Push course with given id to user's schedule
// @access      Private
router.put('/push2schedule/:courseId', auth, async (req, res) => {
    let courseToAdd
    let updatedSchedule

    await User.findById(req.user._id)
        .then(user => updatedSchedule = user.schedule)
    
    if(!updatedSchedule.find(course => course._id === req.params.courseId)){
        await Course.findById(req.params.courseId)
        .then(course => {
            courseToAdd = course
        })
        .catch(err => res.send(err))
        
        User.findByIdAndUpdate(req.user.user._id, {$push: {"schedule": courseToAdd}})
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch(err => res.send(err))
    }
    else{
        res.status(400).send("This course already exists in your schedule")
    }
})

// @route       PUT api/users/unenroll/:courseId
// @desc        Remove course from user's schedule
// @access      Private
router.put('/unenroll/:courseId', auth, async (req, res) => {
    let updatedSchedule

    await User.findById(req.user.user._id)
        .then(user => updatedSchedule = user.schedule)

    let index = updatedSchedule.findIndex(el => el._id === req.params.courseId)
    if(index > -1){
        updatedSchedule.splice(index, 1)

        User.findByIdAndUpdate(req.user.user._id, {schedule: updatedSchedule})
            .then(updatedUser => {
                res.send(updatedUser)
            })
    }
    else{
        res.status(400).send("This course does not exist in your schedule")
    }
})

// @route       PUT api/users/schedule/clear
// @desc        Clear a user's schedule
// @access      Private
router.put('/schedule/clear', auth, async (req, res) => {
    let updatedSchedule

    await User.findById(req.user.user._id)
        .then(user => updatedSchedule = user.schedule)

    let scheduleLength = updatedSchedule.length
    for(let i = 0; i < scheduleLength; ++i){
        updatedSchedule.pop()
    }

    User.findByIdAndUpdate(req.user.user._id, {schedule: updatedSchedule})
            .then(updatedUser => {
                res.send(updatedUser)
            })
            .catch(err => console.log(err))
})

// @route       DELETE api/users
// @desc        Delete a user
// @access      Private
router.delete('/', auth, (req,res) => {
    User.findByIdAndDelete(req.user.user._id)
        .catch(err => res.status(404).send(err))
        .then(res.send(`Successfully deleted user ${req.params.id}`))
})

// @route       DELETE api/users/reset
// @desc        Clear all users from DB
// @access      Public
router.delete('/reset', (req, res) => {
    User.deleteMany({})
        .then(resp => res.send({
            message: `Successfully deleted ${resp.deletedCount} record${resp.deletedCount != 1 ? "s" : ""}`
        }))
        .catch(err => console.log(err))
})

module.exports = router;