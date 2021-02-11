import React, { useContext } from 'react'
import Login from './components/login'
import Home from './components/home'
import Register from './components/register'
import Vocalists from './components/vocalists'
import Header from './components/header'
import Footer from './components/footer'
import Producers from './components/producers'
import Jobs from './components/Jobs'
import Profile from './components/profile'
import EachProfile from './components/eachprofile'
import EachGig from './components/eachgig'
import NoMatch from './components/nomatch'
import CreateJob from './components/createjob'
import GigCenter from './components/gigcenter'
import AwardedGig from './components/awardedgig'
import Messages from './components/messages'
import UserContext from './contexts/user.context'
import Settings from './components/settings'

import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';



const App = () => {

  const [user, dispatch] = useContext(UserContext)

  const handleNotificaitonTab = () => {
    dispatch({
      type: "NOTIFICATIONSTABfalse"
    })
  }


  return (
    <div>


      <Router>
        <Header />

        <div onClick={handleNotificaitonTab} className="body-container">
          <Switch>
            <Route exact path="/awardedgigs/:id" component={AwardedGig} />
            <Route exact path="/profiles/:id" component={EachProfile} />
            <Route exact path="/gigs/:id" component={EachGig} />
            <Route exact path="/messages">
              <Messages />
            </Route>

            <Route exact path="/createjob">
              <CreateJob />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/gigcenter">
              <GigCenter />
            </Route>
            <Route exact path="/registration">
              <Register />
            </Route>
            <Route exact path='/vocalists'>
              <Vocalists />
            </Route>
            <Route exact path='/producers'>
              <Producers />
            </Route>
            <Route exact path='/jobs'>
              <Jobs />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/settings">
              <Settings/>
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </div>


        <Footer />
      </Router>

    </div>

  );
}

export default App;
