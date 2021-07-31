const Course        = require('../models/course.model')
const findCourse    = require('../middleware/findCourse')
const fs            = require('fs')

const getDepartmentArray = () => {
    let data = fs.readFileSync(`${__dirname}/departments.txt`)
    data = data.toString();
    return data.split('\n')
}

const depts = getDepartmentArray();

const validateCourse = async json => {
    const {department, number, professor, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday, lab, firstHalfMod, secondHalfMod} = json;

    await Course.countDocuments({department: department, number: number, professor: professor, startTime: startTime, lab: lab, firstHalfMod: firstHalfMod}, 
            (err, count) => { exists = count > 0 })

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
    else if(await findCourse(json) != null){
        return "exists"
    }
    else{
        return "valid"
    }
}

module.exports = validateCourse;