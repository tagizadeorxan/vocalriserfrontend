import React, { useState, useContext, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'



const Jobs = () => {
    const [user,dispatch] = useContext(UserContext)
    const [login, setLogin] = useState('waiting')

   useEffect(() => {
      checkCurrentUser()
   },[])

   let checkCurrentUser = async () => {
    let result = await requestCurrentUser(user.token)
    if(result) {
     setLogin('success')
    } else {
     setLogin('failed')
    }
   }

    if (login === 'waiting') {
        return (
          <p>loading</p>
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
   Jobs
            </div>
        )
    }


}

export default Jobs