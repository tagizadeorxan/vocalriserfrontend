import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';

import './Footer.css'


export default function Footer(props) {

  const [user, dispatch] = useContext(UserContext)
  return (

    <nav className="bp3-navbar bp3-dark footer-container" style={{backgroundColor:user.theme}}>
   
      <div className="bp3-navbar-group" style={{marginLeft:'15%'}} >
      <span style={{marginRight:'25%',color:user.textColor}} >© Copyright VocalRiser {new Date().getFullYear()}</span>
      <span className="bp3-navbar-divider"></span>
        <button onClick={() => props.locationChange('help')} className="bp3-button bp3-minimal" style={{color:user.textColor}}>Help</button>
        <span className="bp3-navbar-divider"></span>
        <button onClick={() => props.locationChange('terms')} className="bp3-button bp3-minimal" style={{color:user.textColor}}>Terms</button>
        <span className="bp3-navbar-divider"></span>
        <button onClick={() => props.locationChange('privacy')} className="bp3-button bp3-minimal" style={{color:user.textColor}}>Privacy</button>
        <span className="bp3-navbar-divider"></span>
        <button onClick={() => props.locationChange('fees')}className="bp3-button bp3-minimal" style={{color:user.textColor}}>Fees & Charges</button>
        <span className="bp3-navbar-divider"></span>
        <button onClick={() => props.locationChange('about')} className="bp3-button bp3-minimal"style={{color:user.textColor}} >About</button>
      </div>
      { props.path ? <Redirect push to={`/${props.path}`} /> : null}
    </nav>

  );
}
