import React from 'react'
import './enroll-form.styles.css'

import axios from 'axios'

import FormInput from '../form-input/form-input.component';
import Checkbox from '../checkbox/checkbox.component';

class EnrollForm extends React.Component{
    constructor(){
        super();
        this.state = {
            department: "",
            number: "",
            professor: "",
            startTime: "HH:mm",
            endTime: "HH:mm",
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        }
    }

    handleChange = event => {
        const  {value, name} = event.target;
        this.setState({[name]:value})
    }

    handleCheck = event => {
        const {checked, name} = event.target;
        this.setState({[name]: checked})
    }

    handleSubmit = event => {
        const {department, number, professor, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.state;
        event.preventDefault();
        
        //include logic that checks to see if input is valid

        //TODO: add logic so that if this course already exists then user is simply added to the students list
        axios({
            method: "POST",
            url: "http://localhost:8080/api/courses",
            data: {
                department: department.trim().toUpperCase(),
                number: number,
                professor: professor.trim().toLowerCase(),
                startTime: startTime,
                endTime: endTime,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday
            }
        })
            .then(res => console.log(res))
            .catch(err => alert(err.response.data))
            // .catch(err => console.log(err.response.data))

        //TODO: Add route for adding a student to a course's list of students
        //TODO: Add route for adding a course to a students course list
    }

    render(){
        const {department, number, professor, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = this.state;
        return(
            <div className="enroll-form">
                <h2>Enroll Course</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="course">
                        <div className="course-input">
                            <FormInput
                                type="text"
                                name="department"
                                value={department}
                                onChange={this.handleChange}
                                label="Department Abr."
                                required
                            />
                        </div>
                        <div className="course-input">
                            <FormInput
                                type="number"
                                name="number"
                                value={number}
                                onChange={this.handleChange}
                                label="Course Number"
                                required
                            />
                        </div>
                    </div>
                    <FormInput
                        type="text"
                        name="professor"
                        value={professor}
                        onChange={this.handleChange}
                        label="Professor Surname"
                        required
                    />

                    <label htmlFor="startTime">Start Time: </label>
                    <input 
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={this.handleChange}
                        required
                    />
                    <br />
                    <label htmlFor="endTime">End Time: </label>
                    <input 
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={this.handleChange}
                        required
                    />
                    <div className="days">
                        <Checkbox
                            name="monday"
                            label="Mon"
                            checked={monday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="tuesday"
                            label="Tues"
                            checked={tuesday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="wednesday"
                            label="Wed"
                            checked={wednesday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="thursday"
                            label="Thurs"
                            checked={thursday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="friday"
                            label="Fri"
                            checked={friday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="saturday"
                            label="Sat"
                            checked={saturday}
                            onChange={this.handleCheck}
                        />
                        <Checkbox
                            name="sunday"
                            label="Sun"
                            checked={sunday}
                            onChange={this.handleCheck}
                        />
                    </div>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default EnrollForm;