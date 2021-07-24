import React from 'react'
import './schedule.styles.css'

import {v4 as uuid} from 'uuid'

import CoursePrev from '../course-prev/course-prev.component'

const Schedule = ({courseList, edit}) => (
    <div className="schedule">
        <div className="courses">
            {
                courseList.map(c => <CoursePrev course={c} key={uuid()} allowDelete={edit}/>)
            }
        </div>
    </div>
)

export default Schedule;