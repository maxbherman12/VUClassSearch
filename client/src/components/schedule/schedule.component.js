import React from 'react'
import './schedule.styles.css'

import CoursePrev from '../course-prev/course-prev.component'

const Schedule = ({courseList}) => (
    <div className="schedule">
        <h2>My Schedule</h2>
        <div className="courses">
            {
                courseList.map(c => <CoursePrev course={c}/>)
            }
        </div>
    </div>
)

export default Schedule;