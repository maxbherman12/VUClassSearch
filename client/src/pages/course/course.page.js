import React, {useEffect, useState} from 'react'
import './course.styles.css'

import StudentList from '../../components/student-list/student-list.component'

import {formatCourseStr} from '../../utils/course.utils'
import {api as axios} from '../../utils/axios.utils'

const CoursePage = () => {
    const [course, setCourse] = useState(null)

    useEffect(() => {
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        const courseId = urlParams.get('id')

        console.log(courseId)

        axios({
            method: "GET",
            url: `/api/courses/${courseId}`
        })
            .then(res => setCourse(res.data))

        // axios({
        //     method: "GET",
        //     url: `/api/courses/${courseId}`
        // })
        // .then(res => setCourse(res.data))
        // .catch(err => console.log(err))
    }, [])

    console.log(course)
    return(
        <div className="course-page">
            {
                course ?
                (
                    <div className="course-header">
                        <h2>{formatCourseStr(course)}</h2>
                        <p>{course.professor}</p>
                        <StudentList students={course.students} />
                    </div>
                )
                : (<p>Course information loading...</p>)
            }
        </div>
    );
}

export default CoursePage;