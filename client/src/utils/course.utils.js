export function formatCourseStr(course){
    return `${course.department} ${course.number}`
}

export function formatProfessor(professorStr){
    let fmtProfessor = professorStr.trim().toLowerCase()
    return fmtProfessor.charAt(0).toUpperCase() + fmtProfessor.slice(1);
}

export function formatDayStr(course) {
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

export function formatTimeStr(timeStr){
    const colonIdx = timeStr.indexOf(":")
    let hr = timeStr.substring(0, colonIdx)
    let min = timeStr.substring(colonIdx+1, timeStr.length)
    return `${hr == 12 ? 12 : hr % 12}:${min} ${hr < 12 ? "AM" : "PM"}`
}