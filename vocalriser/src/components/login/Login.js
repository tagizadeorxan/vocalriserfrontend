import React, { useState, useContext, useRef } from 'react'
import UserContext from '../../contexts/user.context';
import { requestLogin } from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom';
import './Login.css'



let Login = () => {

    const email = useRef()
    const password = useRef()


    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [user, dispatch] = useContext(UserContext)
    const [success, setSuccess] = useState(false)
    const [signup, setSignUp] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            loginUser()
        }
    }

    const loginUser = async () => {
        setError(false)
        setErrorMessage('')
        let userEmail = email.current.value
        let userPassword = password.current.value


        if (userEmail !== '') {
            if (userPassword !== '') {
                setError(false)
                let data = {
                    email: userEmail,
                    password: userPassword
                }
                let result = await requestLogin(data)
                if (result.error) {
                    setError(true)
                    setErrorMessage(result.error)
                } else {
                    
                    await dispatch({
                        type: "LOGIN",
                        payload: result.user
                    })
                    setSuccess(true)
                }

            } else {
                setError(true)
                setErrorMessage('Password can not be empty')
            }
        } else {
            setError(true)
            setErrorMessage('Email can not be empty')
        }

    }


    const showPassword = () => {
        setPasswordShow(!passwordShow)
    }



    return (

        <div className="login-container">

            <div className="bp4-input-group .modifier login-general">
                <input onKeyPress={handleKeyPress} ref={email} type={"email"} className="bp4-input" placeholder="Enter your email..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-envelope .modifier`}></button>
            </div>


            <div className="bp4-input-group .modifier login-general ">
                <input onKeyPress={handleKeyPress} ref={password} type={passwordShow ? "text" : "password"} className="bp4-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp4-button bp4-minimal bp4-intent-warning ${passwordShow ? 'bp4-icon-unlock' : 'bp4-icon-lock'} .modifier`}></button>
            </div>


            <button type="button" onClick={loginUser} className={`bp4-button bp4-icon-log-in .modifier login-general ${error ? 'bp4-intent-danger' : 'bp4-intent-success'}`}>Sign in</button>

            <button type="button" onClick={() => setSignUp(true)} className="bp4-button .modifier login-general">Sign up</button>

            {error ? <p className="login-general login-error"><i className="bp4-icon-error"></i> {errorMessage}</p> : null}
            {signup ? <Navigate push to="/registration" /> : null}
            {success ? <Navigate push to="/profile" /> : null}



        </div>

    );
}

export default Login;