import React, {createContext, useEffect, useState}  from 'react'
import './App.css';

import {Switch, Route, Redirect}                    from 'react-router-dom'
import {api as axios}                               from './utils/axios.utils'

import CoursePage                                   from './pages/course/course.page';
import EnrollPage                                   from './pages/enroll/enroll.page';
import MyProfilePage                                from './pages/myprofile/myprofile.page';
import ProfilePage                                  from './pages/profile/profile.page';
import HomePage                                     from './pages/home/home.page'
import SchedulePage                                 from './pages/schedule/schedule.page';

import Header                                       from './components/header/header.component'
import LoadingAnimation                             from './components/loading-animation/loading-animation.component'
import YesNoDialog                                  from './components/yes-no-dialog/yes-no-dialog.component';


export const UserContext = createContext(null)

function App(){
    const [loading, setLoading]         = useState(true)
    const [user, setUser]               = useState(null)
    const [openDialog, setOpenDialog]   = useState(false)

    useEffect(() => {
        async function auth(){
            await axios({
                method: "GET",
                url: "/auth/user"
            })
            .then(resUser => setUser(resUser.data))
            .catch(err => console.log("ERROR: ", err.json))
    
            await axios({
                method: "GET",
                url: "/auth/exp"
            })
                .then(res => setTimeout(() => setOpenDialog(true), res.data.exp*1000 - 10000)) //set dialog to pop up 10 seconds before token exp
                .catch(err => console.log(err))
            setLoading(false)
        }
        auth();
    }, [])
    
    return (
        <div className="app">
            <Header user={user} />
            <div className="pages">
                {
                    loading ?
                    <LoadingAnimation/>
                    :
                    <Switch>
                        <UserContext.Provider value={{user, setUser}}>
                            <Route exact path="/" component={HomePage}></Route>
                            <Route path="/course" component={() => user ? <CoursePage/> : <Redirect to="/"/>}></Route>
                            <Route path="/enroll" component={() => user ? <EnrollPage/> : <Redirect to="/"/>}></Route>
                            <Route path="/myprofile" component={() => user ? <MyProfilePage/> : <Redirect to="/"/>}></Route>
                            <Route path="/profile" component={() => user ? <ProfilePage/> : <Redirect to="/"/>}></Route>
                            <Route path="/schedule" component={() => user ? <SchedulePage/> : <Redirect to="/"/>}></Route>
                        </UserContext.Provider>
                    </Switch>
                }
                <YesNoDialog
                    message={`Are you still here? Click "Yes" to continue your session or "No" to be logged out`} 
                    open={openDialog}
                    handleClose={() => window.location.href = 'https://vuclasssearch.herokuapp.com/auth/logout'}
                    handleYes={() => window.location.href = 'https://vuclasssearch.herokuapp.com/auth/google'}
                />
            </div>
        </div>
    );
}

export default App;