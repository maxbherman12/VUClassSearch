import React from 'react'
import './student-list.styles.css'

import {v4 as uuid} from 'uuid'
import {Link} from 'react-router-dom'

const dummyList = [
    {
        id: 1,
        firstName: "Max",
        lastName: "Herman"
    },
    {
        id: 2,
        firstName: "John",
        lastName: "Doe"
    },
    {
        id: 3,
        firstName: "Mia",
        lastName: "Samuels"
    },
    {
        id: 4,
        firstName: "Daniel",
        lastName: "Diermeier"
    },
    {
        id: 5,
        firstName: "Juliette",
        lastName: "Patterson"
    },
    {
        id: 6,
        firstName: "Sam",
        lastName: "Wolfe"
    },
    {
        id: 7,
        firstName: "Charles",
        lastName: "Alessio"
    },
    {
        id: 8,
        firstName: "Jackson",
        lastName: "Thorne"
    },
    {
        id: 9,
        firstName: "Kyle",
        lastName: "McGowan"
    },

]

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