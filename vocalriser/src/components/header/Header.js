import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/user.context';
import { Redirect } from 'react-router-dom';
import './Header.css'


export default function Header() {



  const [user, dispatch] = useContext(UserContext)
  const [logoutUser, setLogout] = useState(false)
  const [path, setPath] = useState()
  const [notificationTab, setNotificationTab] = useState(false)
  
  const locationChange = (nav) => {

    let location = /[^/]*$/.exec(window.location.href)[0]

    if (location === nav) {
      window.location.reload()
    } else if (path === nav) {
      window.location = `/${nav}`
    }
    else {
      setPath(nav)
    }
  }

  const logout = async () => {
    await dispatch({
      type: "LOGOUT"
    })
    setLogout(true)
  }

  return (
    <div >
    
      <nav className="bp3-navbar bp3-dark">
        <div >
          <div className="bp3-navbar-group bp3-align-left">
            <div className="bp3-navbar-heading">VocalRiser</div>
          </div>
          <div className="bp3-navbar-group bp3-align-right header-menu">
            <button onClick={() => locationChange('home')} className="bp3-button bp3-minimal">Home</button>
            <button onClick={() => locationChange('gigcenter')} className="bp3-button bp3-minimal">Gig Center</button>
            <button onClick={() => locationChange('vocalists')} className="bp3-button bp3-minimal">Vocalists</button>
            <button onClick={() => locationChange('producers')} className="bp3-button bp3-minimal">Producers</button>
            <button onClick={() => locationChange('jobs')} className="bp3-button bp3-minimal">Jobs</button>
            <span className="bp3-navbar-divider"></span>
            <button onClick={()=>locationChange('createjob')} className="bp3-button bp3-minimal bp3-icon-new-object">Create Job</button>

            <span className="bp3-navbar-divider"></span>
            
            <button onClick={() => locationChange('profile')} title="profile" className="bp3-button bp3-minimal bp3-icon-user"></button>
            <button className="bp3-button bp3-minimal bp3-icon-notifications" title="notifications"></button>
            <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
            <button onClick={() => setNotificationTab(!notificationTab)} className="bp3-button bp3-minimal bp3-icon-inbox-update bp3-intent-success" title="inbox"> </button>
            
            <button onClick={logout} className="bp3-button bp3-minimal bp3-icon-log-out" title="logout"></button>
          </div>

        </div>
      </nav>

      {
        notificationTab ?
          <div className="header-notification">
            <ul className="bp3-menu .modifier bp3-elevation-1">
              <li>
               
              </li>

            </ul>
          </div> : <div className="header-notification">

          </div>
      }
      { path ? <Redirect push to={`/${path}`} /> : null}
      {logoutUser ? <Redirect push to="/" /> : null}
    </div>
  );
}
