import React from 'react';
import './form-input.styles.css';

const FormInput = ({handleChange, label, disabled, ...otherProps}) => (
    <div className='group'>
        <input className={`form-input ${disabled ? "disabled" : ""}`} onChange={handleChange} disabled={disabled} {...otherProps}/>
        {
            label ? 
            (<label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput;