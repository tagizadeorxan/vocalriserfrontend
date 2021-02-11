import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/user.context';
import { Redirect } from 'react-router-dom';
import { requestCurrentUser } from '../helpers/auth.helper'
import './Header.css'
import { getNotifications } from '../helpers/notifications.helper'

//const icon = require('../../images/vocalriser.png')
import icon from '../../images/vocalriser.png'

let notify = true

export default function Header() {



  const [user, dispatch] = useContext(UserContext)
  const [logoutUser, setLogout] = useState(false)
  const [path, setPath] = useState()





  const handleNotifications = async () => {
    let currentUser = await requestCurrentUser(user.token)
    let result = await getNotifications(currentUser.data.id, user.token)

    if (result) {
      await dispatch({
        type: "NOTIFICATIONS",
        payload: result
      })
    }
  }

  if (notify) {

    handleNotifications()
    notify = false
  } else {
    notify = false
  }

const handleNotificationTab = () => {
  console.log(`NOTIFICATIONSTAB${!user.notificationtab}`)
  dispatch({
    type: `NOTIFICATIONSTAB${!user.notificationtab}`
  })
}

  const locationChange = (nav) => {

    let location = /[^/]*$/.exec(window.location.href)[0]

    if (location === nav) {
      window.location.reload()
    } else {
      // window.location = `/${nav}`
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
            <img style={{ width: "15%" }} src={icon} />
          </div>
          <div className="bp3-navbar-group bp3-align-right header-menu">
            <button onClick={() => locationChange('home')} className="bp3-button bp3-minimal">Home</button>
            <button onClick={() => locationChange('gigcenter')} className="bp3-button bp3-minimal">Gig Center</button>
            <button onClick={() => locationChange('vocalists')} className="bp3-button bp3-minimal">Vocalists</button>
            <button onClick={() => locationChange('producers')} className="bp3-button bp3-minimal">Producers</button>
            <button onClick={() => locationChange('jobs')} className="bp3-button bp3-minimal">Jobs</button>
            <span className="bp3-navbar-divider"></span>
            <button onClick={() => locationChange('createjob')} className="bp3-button bp3-minimal bp3-icon-new-object">Create Job</button>

            <span className="bp3-navbar-divider"></span>

            <button onClick={() => locationChange('profile')} title="profile" className="bp3-button bp3-minimal bp3-icon-user"></button>
            <div className="notification">
              {user.notifications.length > 0 ? <span className="badge">{user.notifications.length}</span> : null}
              <button onClick={handleNotificationTab} className="bp3-button bp3-minimal bp3-icon-notifications" title="notifications"></button>

            </div>

            <button onClick={() => locationChange('settings')} className="bp3-button bp3-minimal bp3-icon-cog"></button>

            <button onClick={() => locationChange(`messages`)} className={`bp3-button bp3-minimal bp3-icon-inbox-update bp3-intent-${user.notifications.find(e => e.type === "message") ? 'success' : 'no'}`} title="inbox"> </button>

            <button onClick={logout} className="bp3-button bp3-minimal bp3-icon-log-out" title="logout"></button>
          </div>

        </div>
      </nav>

      {
        user.notificationtab ?
          <div className="header-notification">

            <ul className="bp3-menu .modifier bp3-elevation-1">

              {user.notifications.length > 0 ? user.notifications.map((n, index) => {
                if (n.type === 'message') {
                  return <li key={index}>
                    <a className="bp3-menu-item bp3-icon-inbox" tabIndex="0">received a message...</a>
                  </li>
                }
              }) : 'no notification'}



            </ul>
          </div> : <div className="header-notification">

          </div>
      }
      { path ? <Redirect push to={`/${path}`} /> : null}
      {logoutUser ? <Redirect push to="/" /> : null}
    </div>
  );
}
