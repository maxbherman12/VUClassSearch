import React, {useContext, useEffect} from 'react'
import { UserContext } from '../../App'

import './schedule.styles.css'

import {Link} from 'react-router-dom'

import Schedule from '../../components/schedule/schedule.component'
import LoadingAnimation from '../../components/loading-animation/loading-animation.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'

const dummySchedule = [
    {
        _id:"60eb27247cafd40e6c37935b",
        department: "CS",
        number: 2201,
        professor: "Roth",
        startTime: "10:20",
        endTime: "11:10",
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false
    },
    {
        _id:"60eb27917cafd40e6c37936b",
        department: "CS",
        number: 3251,
        professor: "Hemmingway",
        startTime: "11:30",
        endTime: "12:20",
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false
    },
    {
        _id:"60eb328a6873af10698ab8d1",
        department: "CSET",
        number: 2100,
        professor: "Ornes",
        startTime: "9:35",
        endTime: "12:15",
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    },
]

const SchedulePage = () => {
    const {user, setUser} = useContext(UserContext);

    return(
        <div className="schedule-page">
            {
                user ?
                (
                    user.schedule.length > 0 ? 
                    <Schedule courseList={user.schedule}/>
                    :
                    <LoadingAnimation/>
                )
                : <p>You need to login to access this page</p>
            }
            <Link to="/enroll">
                <CustomButton>Add Courses</CustomButton>
            </Link>
        </div>
    )
}

export default SchedulePage;