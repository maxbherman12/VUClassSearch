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

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
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
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updatedUser => res.send(removePersonalData(updatedUser)))
        .catch(err => res.status(403).send(err))
})

router.delete('/:id', (req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(res.send(`Successfully deleted user ${req.params.id}`))
        .catch(err => res.status(404).send(err))
})

module.exports = router;