import React from 'react'
import './alert.styles.css'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

//bottom alert by default
const Alert = ({isOpen, children, top, severity, handleClose}) => {
    const getIcon = () => {
        switch(severity){
            case "error":
                return (<ErrorIcon/>)
            case "info":
                return (<InfoIcon/>)
            case "success":
                return (<CheckCircleOutlineIcon/>)
            default:
                return null;
        }
    }

    return(
        <div className={`alert ${top ? "top" : ""} ${severity ? severity : ""} ${isOpen ? "" : "closed"}`}>
            <div className="alert-icon">
                {getIcon()}
            </div>
            <div className="alert-message">
                {children}
            </div>
            <div className="close-alert">
                <CloseIcon onClick={() => handleClose()}/>
            </div>
        </div>
    )
}

export default Alert;