import React from 'react'
import './schedule.styles.css'

import {v4 as uuid} from 'uuid'

import CoursePrev from '../course-prev/course-prev.component'

const Schedule = ({courseList}) => (
    <div className="schedule">
        <h2>My Schedule</h2>
        <div className="courses">
            {
                // courseList.map(c => JSON.stringify(c))
                courseList.map(c => <CoursePrev course={c} key={uuid()}/>)
            }
        </div>
    </div>
)

export default Schedule;