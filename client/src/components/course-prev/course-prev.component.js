import React, { useContext, useState } from 'react'
import './course-prev.styles.css'

import {api as axios} from '../../utils/axios.utils'
import {Link} from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import {formatCourseStr, formatDayStr, formatTimeStr} from '../../utils/course.utils'

import YesNoDialog from '../yes-no-dialog/yes-no-dialog.component';
import { UserContext } from '../../App';

const CoursePrev = ({course, allowDelete}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const {setUser} = useContext(UserContext)

    const handleClose = () => {
        setOpenDialog(false);
    }

    const handleDelete = async () => {
        axios({
            method: "PUT",
            url: `/api/users/unenroll/${course._id}`
        })
            .then(resp => {
                setUser(resp.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="course-prev">
            <Link className="course-info" to={`/course?id=${course._id}`}>
                <div className="course-prof">
                    <h3>{formatCourseStr(course)}</h3>
                    <p>{course.professor}</p>
                </div>
                <div className="date-time">
                    <p>{`${formatTimeStr(course.startTime)} - ${formatTimeStr(course.endTime)}`}</p>
                    <p>{formatDayStr(course)}</p>
                </div>
            </Link>
            <div className={`remove-btn ${allowDelete ? "" : "disable"}`}>
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