import React, {useContext, useState} from 'react'
import { UserContext } from '../../App'
import './schedule.styles.css'

import {api as axios} from '../../utils/axios.utils'
import {Link} from 'react-router-dom'

import Schedule from '../../components/schedule/schedule.component'
import CustomButton from '../../components/custom-button/custom-buttom.component'
import YesNoDialog from '../../components/yes-no-dialog/yes-no-dialog.component'

const SchedulePage = () => {
    const {user, setUser} = useContext(UserContext);
    const [openDialog, setOpenDialog] = useState(false)

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleClear = () => {
        axios({
            method: "PUT",
            url: "/api/users/schedule/clear"
        })
        .then(res => setUser(res.data))
        .catch(err => console.log(err))
    }

    return(
        <div className="schedule-page">
            {
                user.schedule.length > 0 ?
                <div className="schedule-container">
                    <h2>My Schedule</h2>
                    <i>Click into each course to see more details</i>
                    <Schedule courseList={user.schedule} edit/>
                </div> 
                :
                <p id="empty-msg">Your schedule is empty. Click the add courses button below to add classes to your schedule.</p>
            }
            <div className="button-grp">
                <Link to="/enroll" className="add-course">
                    <CustomButton>Add Courses</CustomButton>
                </Link>
                <CustomButton onClick={() => setOpenDialog(true)}>Clear</CustomButton>
                <YesNoDialog
                    message={`Are you sure you would like to clear your schedule?`} 
                    open={openDialog}
                    handleClose={handleClose}
                    handleYes={handleClear}
                />
            </div>
        </div>
    )
}

export default SchedulePage;