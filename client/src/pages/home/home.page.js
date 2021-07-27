import React, {useContext} from 'react'
import './home.styles.css'
import { UserContext } from '../../App'
import Video from '../../assets/nashvilleflyover.mp4'

import CustomButton from '../../components/custom-button/custom-buttom.component'
import {Link as Anchor} from 'react-scroll'

const HomePage = () => {
    const {user, setUser} = useContext(UserContext)
    const scrollOffset = -1*window.innerHeight*.1

    return(
        <div className="homepage">
            <div className="page" id="home">
                <h1>VUClassSearch</h1>
                <br />
                <div className="btn-grp">
                    <Anchor
                        to='about'
                        smooth={true}
                        duration={1000}
                        offset={scrollOffset}
                    >
                        <CustomButton>About</CustomButton>
                    </Anchor>
                    <Anchor
                        to='contact'
                        smooth={true}
                        duration={1000}
                        offset={scrollOffset}
                    >
                        <CustomButton>Contact Us</CustomButton>
                    </Anchor>
                </div>
            </div>
            <div className="page" id="about">
                <h1>ABOUT</h1>
            </div>
            <div className="page" id="contact">
                <h1>CONTACT</h1>
            </div>
            <video autoPlay={true} preload loop muted id="nash-video">
                <source src={Video} type="video/mp4"/>
            </video>
        </div>
    )
}

export default HomePage;