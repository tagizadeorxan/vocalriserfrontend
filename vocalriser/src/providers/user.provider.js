import React, {useReducer} from 'react'
import userReducer from '../reducers/user.reducer'
import UserContext from '../contexts/user.context'

let userState = {
    user:{},
    isLogged:false,
    token:localStorage.getItem('vocalrisertoken') || '',
    vocalists:[],
    producers:[],
    gigs:[]
 }


const UserProvider = ({children}) => {

    const [user,dispatch] = useReducer(userReducer,userState)

    return (
  <UserContext.Provider value={[user,dispatch]}>
       {children}
  </UserContext.Provider>
    )
 }

 export default UserProvider