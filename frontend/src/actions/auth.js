import { types } from '../types/types'
import { endLoading, initLoading, setMessage } from './ui'
import { post, put } from 'axios'

export const initRegister = (name, email, password) => {
    return async(dispatch) => {
        try{
            dispatch(initLoading())
            const data = await post(`http://localhost:3666/api/auth/signup/`, {
                name,
                email,
                password
            }).catch(err => console.log(err))
            if(!data){
                dispatch(endLoading())
                dispatch(setMessage('No hemos podido registrarte.', 'alert')) 
            }
            dispatch(endLoading()) 
            dispatch(setMessage(data.data.message, 'success'))
            
        }catch(err){
            dispatch(endLoading())
        }
    }
}

export const initLogin = (email, password) => {
    return async(dispatch) => {
        try{
            dispatch(initLoading())
            const data = await post(`http://localhost:3666/api/auth/signin/`, {
                email,
                password
            }).catch(err => console.log(err))
            if(!data){
                dispatch(endLoading())
                dispatch(setMessage('No hemos podido iniciar sesion.', 'alert')) 
            }
            dispatch(endLoading()) 
        }catch(err){
            dispatch(endLoading())
        }
    }
}

export const initPassRecovery = (email) => {
    return async(dispatch) => {
        try{
            dispatch(initLoading())
            const data = await put(`http://localhost:3666/api/auth/forgot-password/`, {
                email
            }).catch(err => console.log(err))
            if(!data){
                dispatch(endLoading())
                dispatch(setMessage('No hemos podido enviar el correo.', 'alert')) 
            }
            dispatch(endLoading()) 
            dispatch(setMessage(data.data.message, 'success'))
        }catch(err){
            dispatch(endLoading())
        }
    }
}

export const login = (name, email) => ({
    type: types.login,
    payload: {
        name,
        email
    }
})