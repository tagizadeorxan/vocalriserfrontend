import React from 'react';
import './Footer.css'


export default function Footer() {


  return (

    <nav className="bp3-navbar bp3-dark footer-container">
   
      <div className="bp3-navbar-group" style={{marginLeft:'15%'}} >
      <span style={{marginRight:'25%'}}>© Copyright VocalRiser {new Date().getFullYear()}</span>
      <span className="bp3-navbar-divider"></span>
        <button className="bp3-button bp3-minimal">Help</button>
        <span className="bp3-navbar-divider"></span>
        <button className="bp3-button bp3-minimal">Terms</button>
        <span className="bp3-navbar-divider"></span>
        <button className="bp3-button bp3-minimal">Privacy</button>
        <span className="bp3-navbar-divider"></span>
        <button className="bp3-button bp3-minimal">Fees & Charges</button>
        <span className="bp3-navbar-divider"></span>
        <button className="bp3-button bp3-minimal">About</button>
      </div>
    </nav>

  );
}
