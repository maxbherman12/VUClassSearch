import React from 'react'
import './signup.styles.css'

import FormInput from '../form-input/form-input.component'

class SignUp extends React.Component{
    constructor(){
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }
}