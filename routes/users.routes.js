const express = require('express');
const router = express.Router();

const User = require('../models/user.model')

/**
 * removePersonalData()
 * takes an individual user and cleans the data so that the data flowing to the client does not contain 
 * the usernames and passwords of the users
 * @param data - data for an individual user
 * @returns - cleaned data for user without personal information
 */
const removePersonalData = user => {
    const cleanUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imgUrl: user.imgUrl,
        schedule: user.schedule
    }
    return cleanUser;
}

//GET Routes
router.get('/', (req, res) => {
    User.find({})
        .then(users => users.map(user => {
            return removePersonalData(user)
        }))
        .then(cleanUsers => res.send(cleanUsers))
        .catch(err => res.status(400).send(err))
});

// router.get('/:id', (req, res) => {
//     User.findById(req.params.id)
//         .then(user => {res.send(removePersonalData(user))})
//         .catch(err => res.status(401).send(err))
// })

//get by googleId
router.get('/:googleId', (req, res) => {
    User.findOne({googleId: req.params.googleId})
        .then(user => {res.send(removePersonalData(user))})
        .catch(err => res.status(401).send(err))
})

//POST Routes
router.post('/', (req, res) => {
    User.create(req.body)
        .then(newUser => { res.send(removePersonalData(newUser)) })
        .catch(err => res.status(402).send(err))
})

//PUT Routes
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedUser => res.send(removePersonalData(updatedUser)))
        .catch(err => res.status(403).send(err))
})

router.put('/:userId/:courseId', async (req, res) => {
    let updatedSchedule = []

    await User.findById(req.params.userId)
        .then(user => {
            updatedSchedule = user.schedule
        })

    if(updatedSchedule.includes(req.params.courseId)){
        updatedSchedule.push(req.params.courseId)
        User.findByIdAndUpdate(req.params.userId, {schedule: updatedSchedule})
            .then(updatedUser => res.send(updatedUser))
    }
    else{
        res.status(400).send("Course already exists")
    }
})

//DELETE Routes
router.delete('/:id', (req,res) => {
    User.findByIdAndDelete(req.params.id)
        .catch(err => res.status(404).send(err))
        .then(res.send(`Successfully deleted user ${req.params.id}`))
})

//ONLY USE TO RESET DATABASE DURING TESTING
router.delete('/', (req, res) => {
    User.deleteMany({})
        .then(resp => res.send({
            message: `Successfully deleted ${resp.deletedCount} record${resp.deletedCount != 1 ? "s" : ""}`
        }))
        .catch(err => console.log(err))
})

module.exports = router;