import React from 'react'
import './checkbox.styles.css'

const Checkbox = ({handleChange, label, ...otherProps}) => (
    <div className="check-group">
        {
            label ? (<label htmlFor="checkbox">{label}</label>) : null
        }
        <input type="checkbox" className="checkbox" onChange={handleChange} {...otherProps}/>
    </div>
)

export default Checkbox;
