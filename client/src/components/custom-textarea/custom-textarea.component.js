import React from 'react'
import './custom-textarea.styles.css'

const CustomTextArea = ({handleChange, label, disabled, ...otherProps}) => (
    <div className='textarea-group'>
        <textarea className={`custom-textarea ${disabled ? "disabled" : ""}`} onChange={handleChange} disabled={disabled} wrap="hard" {...otherProps}/>
        {
            label ? 
            (<label className={`${otherProps.value.length ? 'shrink' : ''} custom-textarea-label`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default CustomTextArea;