import React, { useState, useRef } from 'react'
import { createUser } from '../helpers/auth.helper'
import { Redirect } from 'react-router-dom';
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
            <div className="bp3-input-group .modifier register-general">
                <input ref={username} type={"text"} className="bp3-input" placeholder="Enter your username..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier register-general">
                <input ref={email} type={"email"} className="bp3-input" placeholder="Enter your email..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-envelope .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier register-general">
                <input ref={first_name} type={"text"} className="bp3-input" placeholder="Enter your first name..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier register-general">
                <input ref={last_name} type={"text"} className="bp3-input" placeholder="Enter your last name..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>

            <div className="bp3-input-group .modifier register-general">
                <input ref={age} type={"number"} className="bp3-input" placeholder="Enter your feeling age..." autoComplete="on" />
                <button className={`bp3-button bp3-minimal bp3-intent-warning bp3-icon-user .modifier`}></button>
            </div>
            <div className="bp3-select .modifier register-general">
                <select ref={gender}>
                    <option value="">Gender...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                </select>
            </div>

            <div className="bp3-select .modifier register-general">
                <select ref={type}>
                    <option selected value="">Type...</option>
                    <option value="V">Vocalist</option>
                    <option value="P">Producer</option>
                    <option value="VP">Both</option>
                </select>
            </div>

            <div className="bp3-input-group .modifier register-general">
                <input ref={password}  type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Enter your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>
           
            <div className="bp3-input-group .modifier register-general">
                <input ref={confirm_password} type={passwordShow ? "text" : "password"} className="bp3-input" placeholder="Confirm your password..." autoComplete="on" />
                <button onClick={showPassword} className={`bp3-button bp3-minimal bp3-intent-warning ${passwordShow ? 'bp3-icon-unlock' : 'bp3-icon-lock'} .modifier`}></button>
            </div>


            <button type="button" onClick={signup} className={`bp3-button .modifier login-general ${error? 'bp3-intent-danger':'bp3-intent-success'}`}>Sign up</button>

            {error? <p className="register-general register-error"><i className="bp3-icon-error"></i> {errorMessage}</p>:null}
            {success ? <Redirect push to="/" /> : null}
        </div>

    )
}

export default Register