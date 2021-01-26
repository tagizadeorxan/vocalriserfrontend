import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import PianoPlay from '../piano'

let start = true

let Home = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')
 

    let checkCurrentUser = async () => {
        console.log(user.token)
        let result = await requestCurrentUser(user.token)
        if (result.status) {
            await dispatch({
                type: "USER",
                payload: result.data
            })
            setLogin('success')
        } else {
            setLogin('failed')
        }
    }

    if(start) {
        checkCurrentUser()
        start = false
    }

    if (login === 'waiting') {
        return (
            <PianoPlay width={300} classAdd="loading" />
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />
        )
    }

    else if (!user.user.hasOwnProperty('id')) {
        return (
            <Redirect push to="/" />
        )
    }

    else {
        return (
            <div>
                <PianoPlay width={1000} />
            </div>
        )
    }


}

export default Home