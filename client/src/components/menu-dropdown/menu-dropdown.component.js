import React from 'react'
import './menu-dropdown.styles.css'

import MenuItem from '../menu-item/menu-item.component'

import { getBaseUrlClient } from '../../utils/getBaseUrlClient'

const MenuDropdown = ({handleClick}) => (
    <div className="menu-dropdown" onClick={handleClick}>
        <MenuItem link="/">Home</MenuItem>
        <MenuItem link="/myprofile">Edit Profile</MenuItem>
        <MenuItem link="/schedule">My Schedule</MenuItem>
        <MenuItem link="/enroll">Add courses</MenuItem>
        <MenuItem link={`${getBaseUrlClient()}/auth/logout`} atag>Sign Out</MenuItem>
    </div>
)

export default MenuDropdown;