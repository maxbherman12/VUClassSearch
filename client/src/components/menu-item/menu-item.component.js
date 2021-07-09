import React from 'react'
import './menu-item.styles.css'

import {Link} from 'react-router-dom'

const MenuItem = ({children, link, atag}) => (
    <div className="menu-item">
        {
            atag ?
            <a href={link} className="menu-link">{children}</a>
            :
            <Link to={link} className="menu-link">{children}</Link>
        }
    </div>
)

export default MenuItem;