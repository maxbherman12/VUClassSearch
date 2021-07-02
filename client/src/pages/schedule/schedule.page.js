import React from 'react'
import './schedule.styles.css'

import axios from 'axios';

import Schedule from '../../components/schedule/schedule.component'
import LoadingAnimation from '../../components/loading-animation/loading-animation.component'

class SchedulePage extends React.Component{
    constructor(){
        super();
        this.state = {
            schedule: []
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
        </div>
        )
    }
}
export default SchedulePage;