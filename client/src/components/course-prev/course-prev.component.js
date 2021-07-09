import React from 'react'
import './course-prev.styles.css'

const formatTime = (timeStr) => {
    const colonIdx = timeStr.indexOf(":")
    let hr = timeStr.substring(0, colonIdx)
    let min = timeStr.substring(colonIdx+1, timeStr.length)
    return `${hr % 12}:${min} ${hr < 12 ? "AM" : "PM"}`
}

const formatDayStr = (course) => {
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

const CoursePrev = ({course}) => (
    <a className="course-prev" href={`http://localhost:3000/course?id=${course._id}`}>
        <div className="course-prof">
            <h3>{`${course.department} ${course.number}`}</h3>
            <p>{course.professor}</p>
        </div>
        <div className="date-time">
            <p>{`${formatTime(course.startTime)} - ${formatTime(course.endTime)}`}</p>
            <p>{formatDayStr(course)}</p>
        </div>
    </a>
)

export default CoursePrev;