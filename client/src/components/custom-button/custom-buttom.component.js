import React from 'react'
import './custom-button.styles.css'

const CustomButton = ({children, google, ...otherProps}) => (
    <button className={`${google ? "google" : ""} custom-button`}>
        {children}
    </button>
)

export default CustomButton;