

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem('vocalrisertoken', action.payload.token)
            return {
                ...state,
                isLogged: true,
                user: action.payload,
                token: action.payload.token

            }
        case "LOGOUT":
            localStorage.setItem('vocalrisertoken', '')
            return {
                ...state,
                token: '',
                isLogged: false,
                user: {}
            }
        case "USER":
            return {
                ...state,
                user: action.payload
            }
        case "VOCALISTS":
            return {
                ...state,
                vocalists: action.payload
            }
        case "PRODUCERS":
            return {
                ...state,
                producers: action.payload
            }
        case "GIGS":
            return {
                ...state,
                gigs: action.payload
            }
        case "NOTIFICATIONS":
            return {
                ...state,
                notifications: action.payload
            }
        case "NOTIFICATIONSTABfalse":
            return {
                ...state,
                notificationtab: false
            }
        case "NOTIFICATIONSTABtrue":
            return {
                ...state,
                notificationtab: true
            }
        default:
            return state
    }
}

export default userReducer