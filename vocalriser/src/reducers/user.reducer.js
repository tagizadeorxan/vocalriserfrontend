

const userReducer = (state,action) => {
    switch(action.type) {
        case "LOGIN":
            localStorage.setItem('vocalrisertoken',action.payload.token)
            return {
                ...state,
                isLogged:true,
                user:action.payload,
                token:action.payload.token
              
            }
        case "LOGOUT":
            localStorage.setItem('vocalrisertoken','')
            return {
                ...state,
                token:'',
                isLogged:false,
                user:{}
            }
        case "USER":
            return {
                ...state,
                user:action.payload
            }
        case "VOCALISTS":
            return {
                ...state,
                vocalists:action.payload
            }
        case "PRODUCERS":
        return {
                 ...state,
                 producers:action.payload
        }
        case "GIGS":
            return {
                ...state,
                gigs: action.payload
            }
        default:
            return state
    }
} 

export default userReducer