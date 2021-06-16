import { endLoading, initLoading, setMessage } from './ui'
import { post, put } from 'axios'
import { types } from '../types/types'

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
            console.table(email, password, data)
            if(!data){
                dispatch(endLoading())
                dispatch(setMessage('No hemos podido iniciar sesion.', 'alert')) 
                return false
            }
            if(!data.data.success){
                dispatch(endLoading())
                dispatch(setMessage(data.data.message, 'alert'))
                return false
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

export const initAccountActivation = (token) => {
    return async(dispatch) => {
        try{
            const data = await put(`http://localhost:3666/api/auth/email-activate/`, {
                token
            }).catch(err => console.log(err))
            if(!data){
                dispatch(endLoading())
                dispatch(setMessage('No hemos podido activar la cuenta.', 'alert')) 
            }
            if(!data.data.success){
                dispatch(endLoading())
                dispatch(setMessage(data.data.message, 'alert'))
                return false
            }
            console.log(data)
            dispatch(endLoading())
            dispatch(setMessage(data.data.message, 'success'))
        }catch(err){
            console.log(err)
        }
    }
} 

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})