const express           = require('express');
const router            = express.Router();
const validateCourse    = require('../middleware/validateCourse')
const findCourse        = require('../middleware/findCourse')
const auth              = require('../middleware/auth')
const Course            = require('../models/course.model');

// @route       GET api/courses
// @desc        Get all courses
// @access      Public
router.get('/', (req, res) => {
    Course.find({})
        .then(courses => res.send(courses))
        .catch(err => {console.log(err)})
})

// @route       GET api/courses/:id
// @desc        Get a course by its ID
// @access      Public
router.get('/:id', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.send(course))
        .catch(err => {console.log(err)})
})

// @route       POST api/courses
// @desc        Create a new course and add user to students list
// @access      Private
router.post('/', auth, async (req, res) => {
    const validStr = await validateCourse(req.body);
    if(validStr === "valid" || validStr === "exists"){
        let newCourse;

        //if new course, create one
        if(validStr === "valid"){
            await Course.create(req.body)
                .then(course => newCourse = course)
                .catch(err => res.send(err))
        }
        else{
            newCourse = await findCourse(req.body)
        }

        let newStudentsList = newCourse.students;
        newStudentsList.push(req.user)

        //update course student list to contain user
        Course.findByIdAndUpdate(newCourse._id, {students: newStudentsList})
            .then(updatedCourse => res.send(updatedCourse))
            .catch(err => res.send(err))
    }
    else{
        res.status(400).send(validStr)
    }
})

// @route       PUT api/courses/:id
// @desc        Update course of the provided id by parameters in body
// @access      Public
router.put('/:id', (req, res) => {
    Course.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedCourse => res.send(updatedCourse))
        .catch(err => res.send(err))
})

// @route       DELETE api/courses/reset
// @desc        Clear all courses from DB
// @access      Public
router.delete('/reset', (req, res) => {
    Course.deleteMany({})
        .then(resp => res.send({
            message: `Successfully deleted ${resp.deletedCount} record${resp.deletedCount != 1 ? "s" : ""}`
        }))
        .catch(err => console.log(err))
})

module.exports = router; 