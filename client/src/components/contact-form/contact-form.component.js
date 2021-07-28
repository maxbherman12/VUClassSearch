import React, { useState } from 'react'
import './contact-form.styles.css'

import emailjs from 'emailjs-com';

import CustomButton from '../custom-button/custom-buttom.component'

const ContactForm = () => {
    const [formState, setFormState] = useState({
        from_name: '',
        user_email: '',
        message_html: ''
    })

    const sendEmail = e =>  {
        e.preventDefault()
        emailjs.sendForm('service_yvo0cif', 'template_y3t1kuo', e.target, 'user_KzrgCav4EcI9PQ0BqR7tC')
            .then(res => {
                setFormState({
                    from_name: '',
                    user_email: '',
                    message_html: ''
                })
                alert('Thanks for contacting us! We will get back to you as soon as possible.')
            })
            .catch(err => console.log(err))
    }

    const handleChange = event => {
        const  {value, name} = event.target;
        setFormState({...formState, [name]:value})
    }

    return(
        <form className="contactForm" onSubmit={sendEmail}>
            <h2>Contact Us</h2>
            <input type="hidden" name="contact_number" required/>
            <div className="formBox">
                <div className="inputBox w100">
                    <input 
                        type="text"
                        name="from_name"
                        value={formState.from_name}
                        onChange={handleChange}
                        required
                    />
                    <span>Name</span>
                </div>
                <div className="inputBox w100">
                    <input
                        type="email"
                        name="user_email"
                        value={formState.user_email}
                        onChange={handleChange}
                        required
                    />
                    <span>Email Address</span>
                </div>
                <div className="inputBox w100">
                    <textarea
                        name="message_html"
                        value={formState.message_html}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <span>Write your message here...</span>
                </div>
                <CustomButton type='submit'>Send</CustomButton>
            </div>
        </form>
    )
}

export default ContactForm;