import React, {useContext} from 'react'
import { UserContext } from '../../App'

import './schedule.styles.css'

import {Link} from 'react-router-dom'

import Schedule from '../../components/schedule/schedule.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'
// import LoadingAnimation from '../../components/loading-animation/loading-animation.component'

const SchedulePage = () => {
    const {user} = useContext(UserContext);

    return(
        <div className="schedule-page">
            {
                user ?
                <div className="content">
                    {
                        user.schedule.length > 0 ? 
                        <Schedule courseList={user.schedule}/>
                        :
                        <p>Your schedule is empty. Click the add courses button below to add classes to your schedule.</p>
                    }
                    <Link to="/enroll">
                        <CustomButton>Add Courses</CustomButton>
                    </Link>
                </div>
                : <p>You need to login to access this page</p>
            }
        </div>
    )
}

export default SchedulePage;