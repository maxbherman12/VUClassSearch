import React from 'react'
import './signin.styles.css'

import SignIn from '../../components/signin/signin.component'
import SignUp from '../../components/signup/signup.component'

const SignInPage = () => (
    <div className="signin-page">
        <div className="form">
            <SignIn/>
        </div>
        <div className="form">
            <SignUp />
        </div>
    </div>
)

export default SignInPage;