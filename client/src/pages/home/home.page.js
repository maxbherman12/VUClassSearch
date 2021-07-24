import React from 'react'
import './home.styles.css'

import Video from '../../assets/nashvilleflyover.mp4'

import CustomButton from '../../components/custom-button/custom-buttom.component'

const HomePage = () => (
    <div className="homepage">
        <video autoPlay={true} preload loop muted id="nash-video">
            <source src={Video} type="video/mp4"/>
        </video>
        <div className="info-box">
            <h1>VUClassSearch</h1>
        </div>
    </div>
)

export default HomePage;