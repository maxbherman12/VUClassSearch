import React from 'react'
import './student-list.styles.css'

const StudentList = ({students}) => (
    <div className="student-list">
        {
            students.map(student => (
                <div className="student">
                    <h3>{`${student.firstName} ${student.lastName}`}</h3>
                </div>
            ))
        }
    </div>
)

export default StudentList;