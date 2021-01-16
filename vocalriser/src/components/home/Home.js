import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'



let Home = () => {
    const [user,dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')

   useEffect(() => {
      checkCurrentUser()
   },[])

   let checkCurrentUser = async () => {
       console.log(user.token)
    let result = await requestCurrentUser(user.token)
    if(result) {
     setLogin('success')
    } else {
     setLogin('failed')
    }
   }

    if (login === 'waiting') {
        return (
            <p>Loading...</p>
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
   Home
            </div>
        )
    }


}

export default Home