import React, {useContext, useEffect, useState} from 'react'
import './course.styles.css'

import StudentList from '../../components/student-list/student-list.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'

import {formatCourseStr, formatDayStr, formatTimeStr} from '../../utils/course.utils'
import {api as axios} from '../../utils/axios.utils'
import { UserContext } from '../../App'

const CoursePage = () => {
    const [course, setCourse] = useState(null)
    const {user} = useContext(UserContext)

    useEffect(() => {
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        const courseId = urlParams.get('id')

        axios({
            method: "GET",
            url: `/api/courses/${courseId}`
        })
            .then(res => setCourse(res.data))
    }, [])

    const handleClick = async () => {
        if(!course.groupme.share_url){

            let clientId;
            await axios({
                method: "POST",
                url: '/groupme/auth',
                data: course
            })
            .then(res => clientId = res.data)
            
            window.location.href = `https://oauth.groupme.com/oauth/authorize?client_id=${clientId}`
        }
        else{
            window.open(course.groupme.share_url)
        }
    }

    return(
        <div className="course-page">
            {
                course ?
                (
                    <div className="course-container">
                        <div className="course-header">
                            <div className="course-prof">
                                <h3>{formatCourseStr(course)}</h3>
                                <p>{course.professor}</p>
                            </div>
                            <div className="groupme-btn">
                                {
                                    user && user.groupmes.includes(course.groupme.id) ? 
                                    null
                                    : <CustomButton onClick={handleClick}>{`${course.groupme.share_url ? "Join" : "Create"} Course GroupMe`}</CustomButton>
                                }
                            </div>
                            <div className="date-time">
                                <p>{`${formatTimeStr(course.startTime)} - ${formatTimeStr(course.endTime)}`}</p>
                                <p>{formatDayStr(course)}</p>
                            </div>
                        </div>
                        <StudentList students={course.students} />
                    </div>
                )
                : (<p>Course information loading...</p>)
            }
        </div>
    );
}

export default CoursePage;