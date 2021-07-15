import React, {useState} from 'react'
import './header.styles.css'

import {Link} from 'react-router-dom'
import MenuDropdown from '../menu-dropdown/menu-dropdown.component'

const Header = ({user}) => {
    const [open, setOpen] = useState(false);

    return(
    <div className="header">
        <div className="logo-container">
            <Link className="link" to="/">
                <h1>VUClassSearch</h1>
            </Link>
        </div>
        <div className="link-container">
            {
                user ?
                <img src={user.imgUrl} alt="Menu" className="profile-pic" onClick={() => setOpen(!open)} onMouseOver={() => setOpen(true)}/>
                :
                <a href="http://localhost:8080/auth/google" className="link">Sign In With Google</a>
            }
            {
                open ?
                <MenuDropdown handleClick={() => setOpen(!open)}/>
                :
                null
            }
        </div>
    </div>
)}

export default Header;