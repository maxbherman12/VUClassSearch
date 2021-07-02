import React from 'react'
import './signin.styles.css'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-buttom.component'


// import axios from 'axios'

class SignIn extends React.Component{
    constructor(){
        super();
        this.state = {
            email: "",
            password: ""
        }
    }

    handleChange = event => {
        const  {value, name} = event.target;
        this.setState({[name]:value})
    }

    handleSubmit = async event => {
        event.preventDefault();
        // const {firstName, lastName, email, password, confirmPassword} = this.state;

        try {
            //signin logic
        } catch (error) {
            alert(error)
        }

    }

    render(){
        const {email, password} = this.state;
        return(
            <div className="sign-in">
                <h1>Sign In</h1>
                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput 
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <div className="button-container">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton google>Google Sign In</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;