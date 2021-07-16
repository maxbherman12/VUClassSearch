import React, { useContext, useState } from 'react'
import './course-prev.styles.css'

import {api as axios} from '../../utils/axios.utils'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import {formatCourseStr, formatDayStr, formatTimeStr} from '../../utils/course.utils'

import YesNoDialog from '../yes-no-dialog/yes-no-dialog.component';
import { UserContext } from '../../App';

const CoursePrev = ({course}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const {user, setUser} = useContext(UserContext)

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleDelete = async () => {
        axios({
            method: "PUT",
            url: `/api/users/unenroll/${user._id}/${course._id}`
        })
            .then(resp => {
                setUser(resp.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="course-prev">
            <a className="course-info" href={`http://localhost:3000/course?id=${course._id}`}>
                <div className="course-prof">
                    <h3>{formatCourseStr(course)}</h3>
                    <p>{course.professor}</p>
                </div>
                <div className="date-time">
                    <p>{`${formatTimeStr(course.startTime)} - ${formatTimeStr(course.endTime)}`}</p>
                    <p>{formatDayStr(course)}</p>
                </div>
            </a>
            <div className="remove-btn">
                <Tooltip title="Remove course" placement="right">
                    <IconButton onClick={() => setOpenDialog(true)}>
                        <DeleteIcon color="action" fontSize="large"/>
                    </IconButton>
                </Tooltip>
                <YesNoDialog
                    message={`Are you sure you would like to remove ${formatCourseStr(course)} from your schedule?`} 
                    open={openDialog}
                    handleClose={handleClose}
                    handleYes={handleDelete}
                />
            </div>
        </div>
    )
}

export default CoursePrev;