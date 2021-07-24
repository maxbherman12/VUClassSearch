import React from 'react'
import './student-list.styles.css'

import {v4 as uuid} from 'uuid'
import {Link} from 'react-router-dom'

const StudentList = ({students}) => (
    <div className="student-list">
        <h2>Class List</h2>
        <br/>
        <div className="students">
            {
                students.map(student => (
                    <Link to={`/profile?id=${student._id}`} className="student" key={uuid}>
                        <p>{`${student.firstName} ${student.lastName}`}</p>
                    </Link>
                ))
            }
        </div>
    </div>
)

export default StudentList;