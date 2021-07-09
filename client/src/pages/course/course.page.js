import React from 'react'
import './course.styles.css'

import StudentList from '../../components/student-list/student-list.component'

//temp data used for development
const course = {
    department: "CS",
    number: 2201,
    professor: "Roth",
    startTime: "11:30",
    endTime: "12:20",
    students: ["Max Herman", "Rob Diorio", "Caleb Cochran", "Kyle Spottiswood"],
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: false,
    sunday: false
}

class CoursePage extends React.Component{
    constructor(){
        super();
        this.state = {
            department: "",
            number: "",
            professor: "",
            startTime: "HH:mm",
            endTime: "HH:mm",
            students: [],
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }

    componentDidMount(){
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        const courseId = urlParams.get('id')
        console.log(courseId)
        this.setState(course, () => console.log(this.state))
        //use axios to grab most recent course info / student list and store in state
    }

    //replace re typing these functions with exporting them from the course-prev.component file
    formatTime = (timeStr) => {
        const colonIdx = timeStr.indexOf(":")
        let hr = timeStr.substring(0, colonIdx)
        let min = timeStr.substring(colonIdx+1, timeStr.length)
        return `${hr % 12}:${min} ${hr < 12 ? "AM" : "PM"}`
    }
    
    formatDayStr = (course) => {
        let dayStr = "";
        if(course.monday){
            dayStr += "M"
        }
        if(course.tuesday){
            dayStr += "T"
        }
        if(course.wednesday){
            dayStr += "W"
        }
        if(course.thursday){
            dayStr += "R"
        }
        if(course.friday){
            dayStr += "F"
        }
        if(course.saturday){
            dayStr += "Sat"
        }
        if(course.sunday){
            dayStr += "Sun"
        }
        return dayStr;
    }

    render(){
        return(
            <div className="course-page">
                <h2>{`${this.state.department} ${this.state.number}`}</h2>
                <p>{this.state.professor}</p>
                <StudentList students={this.state.students} />
            </div>
        )
    }
}

export default CoursePage;