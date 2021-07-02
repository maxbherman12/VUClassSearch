const express = require('express');
const router = express.Router();

const Course = require('../models/course.model');

const depts = ["CS", "CSET"]

const validateCourse = async json => {
    let exists;
    const {department, number, professor, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = json;
    await Course.countDocuments({department: department, number: number, professor: professor, startTime: startTime}, 
            (err, count) => exists = count > 0)

    if(!depts.find(el => el == department)){
        return "The department you selected does not exist in our records."
    }
    else if(number < 1000){
        return "All course numbers must be 4 digits."
    }
    else if(professor.includes(' ')){
        return "Please submit just your professor's last name (should be one word)."
    }
    else if(startTime > endTime){
        return "Your start time is after your end time."
    }
    else if(!(monday || tuesday || wednesday || thursday || friday || saturday || sunday)){
        return "You must select at least one day in which this course meets."
    }
    else if(exists){
        return "exists"
    }
    else{
        return "valid"
    }
}

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

router.get('/:id/students', (req, res) => {
    Course.findById(req.params.id)
        .then(course => res.send(course.students))
        .catch(err => {console.log(err)})
})

router.post('/:studentId', async (req, res) => {
    const validStr = await validateCourse(req.body);
    if(validStr === "valid"){
        Course.create(req.body)
            .then(course => res.send(course))
            .catch(err => console.log(err))
    }
    else if(validStr === "exists"){
        let newStudents = []
        let courseId;

        await Course.findOne(req.body)
            .then(course => {
                newStudents = course.students
                courseId = course._id
            })
            .catch(err => {console.log(err)})

        newStudents.push(req.params.studentId)

        Course.findByIdAndUpdate(courseId, {students: newStudents})
            .then(updatedCourse => res.send(updatedCourse))
            .catch(err => res.send(err))
    }
    else{
        res.status(400).send(validStr)
    }
})

//ONLY USE TO RESET DATABASE DURING TESTING
router.delete('/', (req, res) => {
    Course.deleteMany({})
        .then(resp => res.send({
            message: `Successfully deleted ${resp.deletedCount} record${resp.deletedCount != 1 ? "s" : ""}`
        }))
        .catch(err => console.log(err))
})

module.exports = router;