const express = require('express');
const router = express.Router();

const User = require('../models/user.model')

//add some middleware that prevents just anyone from getting this info
router.get('/', (req, res) => {
    User.find({})
        .then(users => {res.send(users)})
        .catch(err => {console.log(err)})
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {res.send(user)})
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    User.create(req.body)
        .then(newUser => { res.send(newUser) })
        .catch(e => console.log(e))
})

// router.put('/', (req, res) => {
    
// })

module.exports = router;