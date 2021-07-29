import React, {useContext, useEffect} from 'react'
import './myprofile.styles.css'

import { UserContext } from '../../App'
import { useHistory } from 'react-router-dom'

import ProfileForm from '../../components/profile-form/profile-form.component'

const MyProfilePage = () => {
    const {user, setUser} = useContext(UserContext)
    let history = useHistory();

    useEffect(() => {
        console.log(user)
        // setTimeout(() => {
        //     if(!user){
        //         // history.push('/')
        //         console.log(user)
        //     }
        // }, 3000)
    }, [user])

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