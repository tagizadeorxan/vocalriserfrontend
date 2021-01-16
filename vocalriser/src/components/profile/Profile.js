import React, {useContext, useState, useEffect} from 'react'
import UserContext from '../../contexts/user.context';
import { requestCurrentUser } from '../helpers/auth.helper'
import { Redirect } from 'react-router-dom';

const Profile = () => {

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
             <h1 className="bp3-skeleton">Loading...</h1>
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
    Profile
             </div>
         )
     }
 
 
 
}

export default Profile