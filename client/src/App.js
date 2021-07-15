import React, {createContext, useEffect, useState} from 'react'
import './App.css';

import {Switch, Route} from 'react-router-dom'
import {api as axios} from './utils/axios.utils'

import CoursePage from './pages/course/course.page';
import EnrollPage from './pages/enroll/enroll.page';
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
                url: "/authByToken"
            })
            .then(async res => {
                await axios({
                    method: "GET",
                    url: `/api/users/${res.data.user._id}`
                })
                .then(resUser => {
                    setUser(resUser.data)
                })
            })
            .catch(err => console.log(err))
        }
        auth();
    }, [])
    
    return (
        <div className="app">
            <Header user={user} />
            <div className="pages">
                <Switch>
                    <UserContext.Provider value={{user, setUser}}>
                        <Route exact path="/" component={HomePage}></Route>
                        <Route path="/enroll" component={EnrollPage}></Route>
                        <Route path="/course" component={CoursePage}></Route>
                        <Route path="/schedule" component={SchedulePage}></Route>
                    </UserContext.Provider>
                </Switch>
            </div>
        </div>
    );
}

export default App;