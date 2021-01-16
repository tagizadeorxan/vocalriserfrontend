import React, { useState, useContext, useRef } from 'react'
import UserContext from '../../contexts/user.context';
import { requestLogin } from '../helpers/auth.helper'
import { Redirect } from 'react-router-dom';
import './Login.css'



let Login = () => {

    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [user,dispatch] = useContext(UserContext)
    const [success, setSuccess] = useState(false)
    const [signup, setSignUp] = useState(false)
    const [passwordShow, setPasswordShow] = useState(false)


    const loginUser = async () => {
        setError(false)
        setErrorMessage('')
        let userEmail = email.current.value
        let userPassword = password.current.value
        let userConfirmPassword = confirmPassword.current.value
        

        if (userEmail !== '') {
            if (userPassword !== '' || userConfirmPassword !== '') {
                if (userPassword === userConfirmPassword) {
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
                        console.log(result.user)
                        await dispatch({
                            type: "LOGIN",
                            payload: result.user
                        })
                        setSuccess(true)
                    }
                } else {
                    setError(true)
                    setErrorMessage('Password not match')
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

            <div className="bp3-input-group .modifier login-general">
                <input ref={email} type={"email"} className="bp3-input" placeholder="Enter your email..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-envelope .modifier`}></button>
            </div>


            <div className="bp3-input-group .modifier login-general ">
                <input ref={password} type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>


            <div className="bp3-input-group .modifier login-general ">
                <input ref={confirmPassword} type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>
           
            <button type="button" onClick={loginUser} className={`bp3-button bp3-icon-log-in .modifier login-general ${error? 'bp3-intent-danger':'bp3-intent-success'}`}>Sign in</button>
            
            <button type="button" onClick={()=>setSignUp(true)} className="bp3-button .modifier login-general">Sign up</button>

             {error? <p className="login-general login-error"><i className="bp3-icon-error"></i> {errorMessage}</p>:null}
            {signup ? <Redirect push to="/registration" /> : null}
            {success ? <Redirect push to="/home" /> : null}


       
        </div>

    );
}

export default Login;