import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import PianoPlay from '../piano'


let Home = () => {
    const [user, dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')

    useEffect(() => {
        checkCurrentUser()
    }, [])

    let checkCurrentUser = async () => {
        console.log(user.token)
        let result = await requestCurrentUser(user.token)
        if (result.status) {
            setLogin('success')
        } else {
            setLogin('failed')
        }
    }

    if (login === 'waiting') {
        return (
            <PianoPlay width={1000}/>
        )
    }
    else if (login === 'failed') {
        return (
            <Redirect push to="/" />
        )
    }
    else {
        return (
            <div>
                <PianoPlay  width={1000}/>
            </div>
        )
    }


}

export default Home