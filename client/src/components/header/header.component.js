import React, {useState} from 'react'
import './header.styles.css'

import {Link} from 'react-router-dom'
import {animateScroll} from 'react-scroll'

import MenuDropdown from '../menu-dropdown/menu-dropdown.component'

const Header = ({user}) => {
    const [open, setOpen] = useState(false);

    return(
    <div className="header">
        <div className="logo-container" onClick={() => animateScroll.scrollToTop({duration: 1})}>
            <Link className="link" to="/">
                {/* <h1>VUClassSearch</h1> */}
                <h1>VUClassSearch</h1>
            </Link>
        </div>
        <div className="link-container">
            {
                user ?
                <figure className="profile-pic-container" onClick={() => setOpen(!open)} onMouseOver={() => setOpen(true)}>
                    <img src={user.imgUrl} alt="Menu" className="profile-pic"/>
                    <figcaption>{'Menu \u25bc'}</figcaption>
                </figure>
                :
                <a href="https://vuclasssearch.herokuapp.com/auth/google" className="link">Sign In With Google</a>
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