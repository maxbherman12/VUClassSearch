const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

const User = require('../models/user.model')
const Course = require('../models/course.model')

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

//get by id
router.get('/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => {res.send(user)})
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

router.put('/unenroll/:userId/:courseId', async (req, res) => {
    let updatedSchedule = []

    await User.findById(req.params.userId)
        .then(user => {
            updatedSchedule = user.schedule
        })

    let index = updatedSchedule.findIndex(el => el._id === req.params.courseId)
    if(index > -1){
        updatedSchedule.splice(index, 1)

        User.findByIdAndUpdate(req.params.userId, {schedule: updatedSchedule})
            .then(updatedUser => {
                res.send(updatedUser)
            })
    }
    else{
        res.status(400).send("This course does not exist in your schedule")
    }
})

router.put('/:userId/:courseId', async (req, res) => {
    let updatedSchedule = []

    await User.findById(req.params.userId)
        .then(user => {
            updatedSchedule = user.schedule
        })

    if(!updatedSchedule.find(course => course._id === req.params.courseId)){
        let addedCourse = new Course();
        await Course.findById(req.params.courseId)
            .then(course => {
                addedCourse = course;
            })
            .catch(err => console.log(err))
        
        updatedSchedule.push(addedCourse)

        User.findByIdAndUpdate(req.params.userId, {schedule: updatedSchedule})
            .then(updatedUser => {
                res.send(updatedUser)
            })
            .catch(err => console.log(err))
    }
    else{
        res.status(400).send("This course already exists in your schedule")
    }
})

//clear user schedule
//TODO: FIX
router.put('/clear-schedule/:userId', async (req, res) => {
    let updatedSchedule = []
    await User.findById(req.params.userId)
        .then(user => {
            updatedSchedule = user.schedule
        })

    let count = 1
    while(updatedSchedule.pop()){
        console.log(count++)
    }

    User.findByIdAndUpdate(req.params.userId, {schedule: updatedSchedule})
            .then(updatedUser => {
                res.send(updatedUser)
            })
            .catch(err => console.log(err))
})

router.put('/:userId/addgroupme/:groupmeId', async (req, res) => {
    let updatedGroupmes = []

    await User.findById(req.params.userId)
        .then(user => {
            updatedGroupmes = user.groupmes
        })
        .catch(err => console.log(err))

    if(!updatedGroupmes.find(groupme => groupme === req.params.groupmeId)){
        updatedGroupmes.push(req.params.groupmeId)

        User.findByIdAndUpdate(req.params.userId, {groupmes: updatedGroupmes})
            .then(updatedUser => {
                res.send(updatedUser)
            })
            .catch(err => console.log(err))
    }
    else{
        res.status(400).send("You are already in this groupme")
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