import { types } from '../types/types'

const initialState = {
    loading: false,
    message: null
}

export const uiReducer = (state = initialState, action) => {
    switch(action.type){
        case types.uiSetMessage:
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type
            }

        case types.uiDeleteMessage:
            return {
                ...state,
                message: null,
                type: null
            }

        case types.uiInitLoading:
            return {
                ...state,
                loading: true
            }

        case types.uiEndLoading:
            return {
                ...state,
                loading: false
            }     

        default:
            return true
    }
}