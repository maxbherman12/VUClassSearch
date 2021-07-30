import React from 'react'
import './home.styles.css'
import Video from '../../assets/nashvilleflyover.mp4'

import CustomButton from '../../components/custom-button/custom-buttom.component'
import ContactForm from '../../components/contact-form/contact-form.component'
import Gallery from '../../components/gallery/gallery.component'
import {Link as Anchor} from 'react-scroll'

const HomePage = () => {
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
                <div className="about-text">
                    <h2>About VUClassSearch</h2>
                    <p>
                        VUClassSearch is a web platform built to help connect Vanderbilt University students with their classmates. Our mission is to forge relationships between peers to increase the exposure of information pertinent to students' success. 
                    </p>
                    <p>
                        Students can register using their Vanderbilt email and begin by adding a course to their schedule. They may navigate to the course page for each of their classes where they will be able to see a list of students also enrolled in their section of that course. Furthermore, students can create or join a GroupMe for their course so that they may more easily communicate with their peers.
                    </p>
                    <p>Students can also view the schedules of other users (this can be toggled off in settings) to explore courses that students with similar interests are enrolled in.</p>
                    <p>To report an issue or ask questions, please  
                    <Anchor
                        className="scroll-link"
                        to='contact'
                        smooth={true}
                        duration={1000}
                        offset={scrollOffset}
                    >
                    {" contact us!"}
                    </Anchor></p>
                    
                </div>
                <Gallery/>
            </div>
            <div className="page" id="contact">
                <ContactForm/>
            </div>
            <video autoPlay={true} preload="auto" loop muted id="nash-video">
                <source src={Video} type="video/mp4"/>
            </video>
        </div>
    )
}

export default HomePage;