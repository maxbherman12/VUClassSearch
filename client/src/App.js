import React from 'react'
import './App.css';

import {Switch, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import {withCookies, Cookies} from 'react-cookie'

import SignInPage from './pages/signin/signin.page';
import EnrollPage from './pages/enroll/enroll.page';
import SchedulePage from './pages/schedule/schedule.page';
import CoursePage from './pages/course/course.page';

import Header from './components/header/header.component'

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired()
  }

  constructor(){
    super();
    
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      imgUrl: "",
      schedule: []
    }
  }

  async componentDidMount(){
    /*
    let queryString = window.location.search
    let urlParams = new URLSearchParams(queryString)
    const googleId = urlParams.get('id')

    if(googleId){
      await axios({
        method: "GET",
        url: `http://localhost:8080/api/users/${googleId}`
      })
        .then(res => {
            this.setState({
                _id: res.data._id,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email,
                imgUrl: res.data.imgUrl,
                schedule: res.data.schedule
            })
        })
        .then(() => console.log("state: ", this.state))
    }
    */
   console.log(Cookies.get('token'))
  }

  render(){
    return (
      <div className="app">
        <Header user={this.state._id} image={this.state.imgUrl}/>
        <div className="pages">
          <Switch>
            <Route exact path="/" component={()=>(<h1>HOME</h1>)}></Route>
            <Route path="/enroll" component={EnrollPage}></Route>
            <Route path="/course" component={CoursePage}></Route>
            <Route path="/schedule" render={() => <SchedulePage schedule={this.state.schedule}/>}></Route>
            <Route exact path='/signin' render={() => this.state.currentUser ? (<Redirect to='/' />) : (<SignInPage/>)}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
