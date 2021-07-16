import React from 'react'
import './student-list.styles.css'

import {v4 as uuid} from 'uuid'

const StudentList = ({students}) => (
    <div className="student-list">
        <h2>Class List</h2>
        <br/>
        {
            students.map(student => (
                <div className="student" key={uuid}>
                    <p>{`${student.firstName} ${student.lastName}`}</p>
                </div>
            ))
        }
    </div>
)

export default StudentList;