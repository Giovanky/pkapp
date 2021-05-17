import { types } from '../types/types'

export const authReducer = (state = {}, action) => {
    switch(action.type){
        case types.authLogin:
            return {
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password
            }

        case types.authLogout: 
            return { }

        default:
            return state
    }
}