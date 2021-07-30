import React, {useContext} from 'react'
import './myprofile.styles.css'

import { UserContext } from '../../App'

import ProfileForm from '../../components/profile-form/profile-form.component'

const MyProfilePage = () => {
    const {user, setUser} = useContext(UserContext)

    return(
        <div className="myprofile-page">
            {
                user ? 
                <div className="myprofile-form-container">
                    <h2>My Profile</h2>
                    <ProfileForm user={user} setUser={setUser}/>
                </div>
                : null
            }
        </div>
    )
}

export default MyProfilePage;