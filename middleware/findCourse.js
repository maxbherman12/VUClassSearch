const Course    = require('../models/course.model')

const findCourse = async json => {
    const {department, number, professor, startTime, lab, firstHalfMod, secondHalfMod} = json;

    let courses;
    await Course.find({department: department, number: number, professor: professor, startTime: startTime})
        .then(res => courses = res)

    courses.filter(el => el.lab === lab && el.firstHalfMod === firstHalfMod && el.secondHalfMod === secondHalfMod)

    return courses.length > 0 ? courses[0] : null
}

module.exports = findCourse