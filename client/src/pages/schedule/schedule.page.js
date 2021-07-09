import React from 'react'
import './schedule.styles.css'

import axios from 'axios';
import {Link} from 'react-router-dom'

import Schedule from '../../components/schedule/schedule.component'
import LoadingAnimation from '../../components/loading-animation/loading-animation.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'

const mockSchedule = [
    {
        _id: "123455",
        department: "CS",
        number: 2201,
        professor: "Roth",
        startTime: "10:00",
        endTime: "10:50",
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false
    },
    {
        _id: "34890529",
        department: "CSET",
        number: 2100,
        professor: "Ornes",
        startTime: "9:35",
        endTime: "10:50",
        monday: false,
        tuesday: true,
        wednesday: false,
        thursday: true,
        friday: false,
        saturday: false,
        sunday: false
    },
    {
        _id: "9w948453",
        department: "CS",
        number: 3251,
        professor: "Hemmingway",
        startTime: "13:00",
        endTime: "13:50",
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false
    }
]

class SchedulePage extends React.Component{
    constructor({schedule}){
        super();
        this.state = {
            schedule: mockSchedule
        }
    }

    // componentDidMount(){
    //     axios({
    //         method: "GET",
    //         url: `http://localhost:8080/api/users/${userId}/schedule`
    //     })
    //         .then(sched => {
    //             this.setState({schedule: sched})
    //         })
    //         .catch(err => console.log(err))
    // }

    render(){
        return(
        <div className="schedule-page">
            {
                this.state.schedule.length > 0 ? 
                <Schedule courseList={this.state.schedule}/>
                :
                <LoadingAnimation/>
            }
            <Link to="/enroll">
                <CustomButton>Add Courses</CustomButton>
            </Link>
        </div>
        )
    }
}
export default SchedulePage;