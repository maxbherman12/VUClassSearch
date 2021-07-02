import React from 'react'
import './header.styles.css'

import {Link} from 'react-router-dom'

const Header = ({user, image}) => (
    <div className="header">
        <div className="logo-container">
            <Link className="link" to="/">
                <h1>VUCourseSearch</h1>
            </Link>
        </div>
        <div className="link-container">
            {
                user ?
                <img src={image} alt="Menu" className="profile-pic" />
                :
                <a href="http://localhost:8080/auth/google" className="link">Sign In With Google</a>
            }
        </div>
    </div>
)

export default Header;