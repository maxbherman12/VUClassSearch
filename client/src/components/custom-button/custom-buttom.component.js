import React from 'react'
import './custom-button.styles.css'

const CustomButton = ({children, google, bnw, ...otherProps}) => (
    <button className={`${google ? "google" : ""} custom-button`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;