import React, { useState, useRef } from 'react'
import { createUser } from '../helpers/auth.helper'
import { Navigate } from 'react-router-dom';
import './Register.css'


let Register = () => {

    const username = useRef()
    const email = useRef()
    const first_name = useRef()
    const last_name = useRef()
    const age = useRef()
    const password = useRef()
    const confirm_password = useRef()
    const gender = useRef()
    const type = useRef()
    const [passwordShow, setPasswordShow] = useState(false)

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState()
    const [success, setSuccess] = React.useState(false)



    const signup = async () => {
        setError(false)
        let data = {
            username: username.current.value || '',
            email: email.current.value || '',
            first_name: first_name.current.value || '',
            last_name: last_name.current.value || '',
            age: age.current.value || '',
            gender: gender.current.value || '',
            type: type.current.value || '',
            password: password.current.value ||'',
            confirm_password: confirm_password.current.value || ''
        }

        let result = await createUser(data)

        if (result.status) {
            setSuccess(true)
        } else {
         
            if (result.code === 400) {
            
                setError(true)
                setErrorMessage(result.errors[0].msg)
            } else {
                setError(true)
                setErrorMessage(result.errorMessage)
            }


        }
    }

    const showPassword = () => {
        setPasswordShow(!passwordShow)
    }

    return (

        <div className="register-container">
            <div className="bp4-input-group .modifier register-general">
                <input ref={username} type={"text"} className="bp4-input" placeholder="Enter your username..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-user .modifier`}></button>
            </div>

            <div className="bp4-input-group .modifier register-general">
                <input ref={email} type={"email"} className="bp4-input" placeholder="Enter your email..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-envelope .modifier`}></button>
            </div>

            <div className="bp4-input-group .modifier register-general">
                <input ref={first_name} type={"text"} className="bp4-input" placeholder="Enter your first name..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-user .modifier`}></button>
            </div>

            <div className="bp4-input-group .modifier register-general">
                <input ref={last_name} type={"text"} className="bp4-input" placeholder="Enter your last name..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-user .modifier`}></button>
            </div>

            <div className="bp4-input-group .modifier register-general">
                <input ref={age} type={"number"} className="bp4-input" placeholder="Enter your feeling age..." autoComplete="on" />
                <button className={`bp4-button bp4-minimal bp4-intent-warning bp4-icon-user .modifier`}></button>
            </div>
            <div className="bp4-select .modifier register-general">
                <select ref={gender}>
                    <option value="">Gender...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>

            <div className="bp4-select .modifier register-general">
                <select ref={type}>
                    <option selected value="">Type...</option>
                    <option value="V">Vocalist</option>
                    <option value="P">Producer</option>
                    <option value="VP">Both</option>
                </select>
            </div>

            <div className="bp4-input-group .modifier register-general">
                <input ref={password}  type={passwordShow ? "text" : "password"} className="bp4-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp4-button bp4-minimal bp4-intent-warning ${passwordShow ? 'bp4-icon-unlock' : 'bp4-icon-lock'} .modifier`}></button>
            </div>
           
            <div className="bp4-input-group .modifier register-general">
                <input ref={confirm_password} type={passwordShow ? "text" : "password"} className="bp4-input" placeholder="Confirm your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp4-button bp4-minimal bp4-intent-warning ${passwordShow ? 'bp4-icon-unlock' : 'bp4-icon-lock'} .modifier`}></button>
            </div>


            <button type="button" onClick={signup} className={`bp4-button .modifier login-general ${error? 'bp4-intent-danger':'bp4-intent-success'}`}>Sign up</button>

            {error? <p className="register-general register-error"><i className="bp4-icon-error"></i> {errorMessage}</p>:null}
            {success ? <Navigate push to="/" /> : null}
        </div>

    )
}

export default Register