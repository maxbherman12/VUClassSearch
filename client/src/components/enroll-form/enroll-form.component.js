import React, {useContext, useState} from 'react'
import {UserContext} from '../../App'
import './enroll-form.styles.css'

import {api as axios} from '../../utils/axios.utils'
import {formatCourseStr, formatProfessor} from '../../utils/course.utils'

import FormInput from '../form-input/form-input.component';
import Checkbox from '../checkbox/checkbox.component';
import CustomButton from '../custom-button/custom-buttom.component'
import Alert from '../alert/alert.component'

const courseNullState = {
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
    sunday: false,
    lab: false
}

const EnrollForm = () => {
    const [formData, setFormData] = useState(courseNullState)
    const {department, number, professor, lab, startTime, endTime, monday, tuesday, wednesday, thursday, friday, saturday, sunday} = formData

    const {setUser} = useContext(UserContext);
    const [openError, setOpenError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Alert");

    const openAlert = (message, alertDuration, func) => {
        console.log(message)
        setAlertMessage(message)
        func(true)
        setTimeout(() => {func(false)}, alertDuration)
    }
    
    const handleChange = event => {
        const  {value, name} = event.target;
        setFormData({...formData, [name]:value})
    }

    const handleCheck = event => {
        const {checked, name} = event.target;
        setFormData({...formData, [name]:checked})
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        await axios({
            method: "POST",
            url: `/api/courses/`,
            data: {
                department: department.trim().toUpperCase(),
                number: number,
                professor: formatProfessor(professor),
                startTime: startTime,
                endTime: endTime,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
                groupme: {
                    id: "",
                    share_url: ""
                },
                lab: lab
            }
        }).then(res =>  {
                axios({
                    method: "PUT",
                    url: `/api/users/push2schedule/${res.data._id}`
                })
                    .then(async resp => {
                        // await openAlert(`Successfully addded ${formatCourseStr(res.data)} to schedule`, 4000, setOpenError)
                        alert(`Successfully addded ${formatCourseStr(res.data)} to schedule`)
                        setFormData(courseNullState)
                        setUser(resp.data)
                    })
                    .catch(err => openAlert(err.response.data, 4000, setOpenError))
            })
            .catch(err => openAlert(err.response.data, 4000, setOpenError))
    }

    return(
        <div className="enroll-form">
            <h2>Add a course</h2>
            <form onSubmit={handleSubmit}>
                <div className="course">
                    <div className="course-input">
                        <FormInput
                            type="text"
                            name="department"
                            value={department}
                            onChange={handleChange}
                            label="Department Abr."
                            required
                        />
                    </div>
                    <div className="course-input">
                        <FormInput
                            type="number"
                            name="number"
                            value={number}
                            onChange={handleChange}
                            label="Course Number"
                            required
                        />
                    </div>
                </div>
                <FormInput
                    type="text"
                    name="professor"
                    value={professor}
                    onChange={handleChange}
                    label="Professor Surname"
                    required
                />
                <div className="time">
                    <label htmlFor="startTime">Start Time: </label>
                    <input 
                        type="time"
                        name="startTime"
                        value={startTime}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="endTime">End Time: </label>
                    <input 
                        type="time"
                        name="endTime"
                        value={endTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="days">
                    <Checkbox
                        name="monday"
                        label="Mon"
                        checked={monday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="tuesday"
                        label="Tues"
                        checked={tuesday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="wednesday"
                        label="Wed"
                        checked={wednesday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="thursday"
                        label="Thurs"
                        checked={thursday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="friday"
                        label="Fri"
                        checked={friday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="saturday"
                        label="Sat"
                        checked={saturday}
                        onChange={handleCheck}
                    />
                    <Checkbox
                        name="sunday"
                        label="Sun"
                        checked={sunday}
                        onChange={handleCheck}
                    />
                </div>
                <Checkbox
                    name="lab"
                    label="Lab?"
                    checked={lab}
                    onChange={handleCheck}
                />
                <br />
                <CustomButton type="submit">Add Course</CustomButton>
                <br/>
            </form>

            <Alert 
                isOpen={success}
                severity="success"
                handleClose={() => setSuccess()}
            >
                {alertMessage}
            </Alert>
            <Alert 
                isOpen={openError}
                severity="error"
                handleClose={() => setOpenError()}
            >
                {alertMessage}
            </Alert>
        </div>
    )
}

export default EnrollForm;