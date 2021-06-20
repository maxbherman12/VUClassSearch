const express = require('express');
const router = express.Router();

const Course = require('../models/course.model');

router.get('/', (req, res) => {
    Course.find({})
        .then(courses => res.send(courses))
        .catch(err => {console.log(err)})
})

router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.send(course))
        .catch(err => {console.log(err)})
})

router.post('/', (req, res) => {
    Course.create(req.body)
        .then(course => res.send(course))
        .catch(err => console.log(err))
})

module.exports = router;