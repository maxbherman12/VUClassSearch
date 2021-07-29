import React, {useEffect, useState} from 'react'
import './profile.styles.css'

import {api as axios} from '../../utils/axios.utils'
import Schedule from '../../components/schedule/schedule.component'

const ProfilePage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        let queryString = window.location.search
        let urlParams = new URLSearchParams(queryString)
        const userId = urlParams.get('id')

        axios({
            method: "GET",
            url: `/api/users/${userId}`
        })
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [])

    return(
        <div className="profile-page-container">
            {
                user ?
                <div className={`profile-page ${user.hideSchedule ? "hide-schedule" : ""}`}>
                    <div className="profile-info">
                        <img src={user.imgUrl} alt="Profile Pic" />
                        <div className="profile-header">
                            <h2>{`${user.firstName} ${user.lastName}`}</h2>
                            {
                                user.major === "N/A" ?
                                <p>{`Major: ${user.major}`}</p>
                                :
                                <i>{user.major}</i>
                            }
                            {
                                user.bio ?
                                <p id="bio"><strong>Bio: </strong>{user.bio}</p>
                                : null
                            }
                        </div>
                    </div>
                    {
                        user.hideSchedule ? 
                        <p>User has elected to hide schedule</p> :
                        <div className="profile-schedule-container">
                            <h2>Schedule</h2>
                            <Schedule courseList={user.schedule}/>
                        </div>
                    }
                </div>
                : null
            }
        </div>
    )
}

export default ProfilePage;