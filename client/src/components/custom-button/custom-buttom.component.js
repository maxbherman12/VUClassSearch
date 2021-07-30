import React from 'react'
import './custom-button.styles.css'

const CustomButton = ({children, sm, ...otherProps}) => (
    <button className={`custom-button ${sm ? "sm" : ""}`} {...otherProps}>
        {children}
    </button>
)

export default CustomButton;