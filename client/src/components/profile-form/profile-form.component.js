import React, {useState} from 'react'
import './profile-form.styles.css'

import {api as axios} from '../../utils/axios.utils'

import FormInput from '../form-input/form-input.component';
import CustomTextArea from '../custom-textarea/custom-textarea.component';
import CustomButton from '../custom-button/custom-buttom.component'
import Checkbox from '../checkbox/checkbox.component';

const ProfileForm = ({user, setUser}) => {
    const [editUser, setEditUser] = useState(user)
    const [editMode, setEditMode] = useState(false)

    const handleChange = event => {
        const  {value, name} = event.target;
        setEditUser({...editUser, [name]:value})
    }

    const handleCheck = event => {
        const {checked, name} = event.target;
        setEditUser({...editUser, [name]:checked})
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios({
            method: "PUT",
            url: "/api/users",
            data: editUser
        })
            .then(res => setUser(res.data))

        setEditMode(false)
    }
    
    return(
        <div className="profile-form">
            {
                !editMode ?
                <CustomButton onClick={() => setEditMode(true)}>Edit</CustomButton>
                : null
            }
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <div className="half-input">
                        <FormInput 
                            label="First name:"
                            type="text"
                            name="firstName"
                            value={editUser.firstName}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </div>
                    <div className="half-input right">
                        <FormInput 
                            label="Last name:"
                            type="text"
                            name="lastName"
                            value={editUser.lastName}
                            onChange={handleChange}
                            disabled={!editMode}
                            required
                        />
                    </div>
                </div>
                <FormInput 
                    label="Major (optional):"
                    type="text"
                    name="major"
                    value={editUser.major}
                    onChange={handleChange}
                    disabled={!editMode}
                    required
                />
                <CustomTextArea
                    label="Bio (optional):"
                    type="text"
                    name="bio"
                    value={editUser.bio}
                    onChange={handleChange}
                    disabled={!editMode}
                />
                <Checkbox
                    label="Hide schedule from other users"
                    name="hideSchedule"
                    checked={editUser.hideSchedule}
                    handleChange={handleCheck}
                    disabled={!editMode}
                />
                <br/>
                {
                    editMode ? 
                    <CustomButton type="submit">Save</CustomButton>
                    : null
                }
            </form>
        </div>
    )
}

export default ProfileForm;