import './App.css';

import {Switch, Route} from 'react-router-dom'

import SignInPage from './pages/signin/signin.page';
import EnrollPage from './pages/enroll/enroll.page';

function App() {
  return (
    <div className="App">
      <h1>VUClassSearch</h1>
      {/* HEADER */}
      <Switch>
        <Route exact path="/" component={()=>(<h1>HOME</h1>)}></Route>
        <Route path="/signin" component={SignInPage}></Route>
        <Route path="/enroll" component={EnrollPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
