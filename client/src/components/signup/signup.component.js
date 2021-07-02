import React from 'react'
import './signup.styles.css'

import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-buttom.component'

import axios from 'axios'

class SignUp extends React.Component{
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleChange = event => {
        const  {value, name} = event.target;
        this.setState({[name]:value})
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {firstName, lastName, email, password, confirmPassword} = this.state;

        //should add in some password checking function for making strong passwords as well
        if(password !== confirmPassword){
            alert("Passwords don't match")
        }

        try {
            axios({
                method: 'POST',
                url: 'http://localhost:8080/api/users',
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password
                }
            })
                .then(res => console.log(res))
        } catch (error) {
            alert(error)
        }

        this.setState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })

    }

    render(){
        const {firstName, lastName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h1>Sign Up</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="name-container">
                        <div className="name-input">
                            <FormInput 
                                type='text'
                                name='firstName'
                                value={firstName}
                                onChange={this.handleChange}
                                label='First Name'
                                required
                            />
                        </div>
                        <div className="name-input">
                            <FormInput 
                                type='text'
                                name='lastName'
                                value={lastName}
                                onChange={this.handleChange}
                                label='Last Name'
                                required
                            />
                        </div>
                    </div>
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
                    <FormInput 
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <div className="button-container">
                        <CustomButton type="submit">Sign Up</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp;