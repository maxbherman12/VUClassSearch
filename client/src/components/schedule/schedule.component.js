import React from 'react'
import './schedule.styles.css'

import CoursePrev from '../course-prev/course-prev.component'

const Schedule = ({courseList}) => (
    <div className="schedule">
        {
            courseList.map(course => <CoursePrev name={course.name}/>)
        }
    </div>
)

export default Schedule;