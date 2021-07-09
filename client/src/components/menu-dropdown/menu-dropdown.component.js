import React from 'react'
import './menu-dropdown.styles.css'

import MenuItem from '../menu-item/menu-item.component'

const MenuDropdown = ({handleClick}) => (
    <div className="menu-dropdown" onClick={handleClick}>
        <MenuItem link="/profile">Profile</MenuItem>
        <MenuItem link="/schedule">My Schedule</MenuItem>
        <MenuItem link="/enroll">Add courses</MenuItem>
        <MenuItem link="http://localhost:8080/logout" atag>Sign Out</MenuItem>
    </div>
)

export default MenuDropdown;