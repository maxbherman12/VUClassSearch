import React, { useEffect } from 'react'
import './alert.styles.css'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

// export const createAlert = (message, severity, top=false) => {
//     let open = true;

//     setTimeout(() => open = false, 3000)

//     return(
//         <Alert
//             isOpen={open}
//             top={top}
//             severity={severity}
//             handleClose={() => open = false}
//         >
//             {message}
//         </Alert>
//     )
// }

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
        <div>
            {
                isOpen ?
                <div className={`alert ${top ? "top" : ""} ${severity ? severity : ""}`}>
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
                : null
            }
        </div>
    )
}

export default Alert;