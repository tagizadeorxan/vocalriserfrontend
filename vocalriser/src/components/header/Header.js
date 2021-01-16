import React, { useContext, useState } from 'react';
import UserContext from '../../contexts/user.context';
import { Redirect } from 'react-router-dom';
import './Header.css'


export default function Header() {
  const [user,dispatch] = useContext(UserContext)
  const [logoutUser, setLogout] = useState(false)
  const [path, setPath] = useState()

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
            <button onClick={() => setPath('home')} className="bp3-button bp3-minimal">Home</button>
            <button onClick={() => setPath('vocalists')} className="bp3-button bp3-minimal">Vocalists</button>
            <button onClick={() => setPath('producers')} className="bp3-button bp3-minimal">Producers</button>
            <button onClick={() => setPath('jobs')} className="bp3-button bp3-minimal">Jobs</button>

            <span className="bp3-navbar-divider"></span>
            <button  onClick={() => setPath('profile')} className="bp3-button bp3-minimal bp3-icon-user"></button>
            <button className="bp3-button bp3-minimal bp3-icon-notifications"></button>
            <button className="bp3-button bp3-minimal bp3-icon-cog"></button>
            <button onClick={logout} className="bp3-button bp3-minimal bp3-icon-log-out"></button>
          </div>
        </div>
      </nav>

      {path ? <Redirect push to={`/${path}`} /> : null}
      {logoutUser ? <Redirect push to="/" /> : null}
    </div>
  );
}
