import React, {createContext, useEffect, useState} from 'react'
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom'
import {api as axios} from './utils/axios.utils'

import CoursePage from './pages/course/course.page';
import EnrollPage from './pages/enroll/enroll.page';
import MyProfilePage from './pages/myprofile/myprofile.page';
import ProfilePage from './pages/profile/profile.page';
import HomePage from './pages/home/home.page'
import SchedulePage from './pages/schedule/schedule.page';

import Header from './components/header/header.component'

export const UserContext = createContext(null)

function App(){
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function auth() {
            await axios({
                method: "GET",
                url: "/auth/user"
            })
            .then(res => {
                setUser(res.user)
                alert(res.exp)
            })
            .catch(err => console.log("ERROR: ", err.json))
            
        }
        auth();
        
        // axios({
        //     method: "GET",
        //     url: "/auth/exp"
        // })
        // .then(res => alert(`Seconds left: ${res.data}`))
        // .catch(err => console.log("ERROR: ", err))
    }, [])
    
    return (
        <div className="app">
            <Header user={user} />
            <div className="pages">
                <Switch>
                    <UserContext.Provider value={{user, setUser}}>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/course" component={() => user ? <CoursePage/> : <Redirect to="/"/>}></Route>
                        <Route path="/enroll" component={() => user ? <EnrollPage/> : <Redirect to="/"/>}></Route>
                        <Route path="/myprofile" component={MyProfilePage}></Route>
                        <Route path="/profile" component={ProfilePage}></Route>
                        <Route path="/schedule" component={() => user ? <SchedulePage/> : <Redirect to="/"/>}></Route>
                    </UserContext.Provider>
                </Switch>
            </div>
        </div>
    );
}

export default App;