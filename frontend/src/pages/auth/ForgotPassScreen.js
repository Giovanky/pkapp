import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isEmail } from 'validator'
import { initPassRecovery } from '../../actions/auth'
import { deleteMessage, setMessage } from '../../actions/ui'
import { UiMessage } from '../../components/UiMessage'
import { useForm } from '../../hooks/useForm'

export const ForgotPassScreen = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [values, handleInputChange] = useForm({email: ''})
    const {email} = values

    const {loading} = useSelector(state => state.ui)

    const handleForgot = (e) => {
        e.preventDefault()
        if(isFormValid()){
            dispatch(initPassRecovery(email))
        }
    }

    const toSignin = () => {
        dispatch(deleteMessage())
        history.replace('/auth/signin')
    }

    const isFormValid = () => {
        if(!isEmail(email)){
            dispatch(setMessage('No es un email valido!', 'alert'))
            return false
        }
        dispatch(deleteMessage())
        return true
    }

    return (
        <form 
            className="container"
            onSubmit={handleForgot}
        >
            <h1 className="container__title">
                Olvidaste la contraseña?
            </h1>

            <UiMessage />

            <p className="container__info">
                Te enviaremos un correo con los pasos que debes seguir para cambiar la contraseña. Asegurate de revisar la carpeta de spam.
            </p>

            <input 
                className="input" 
                type="text" 
                name="email" 
                autoComplete="off" 
                value={email}
                onChange={handleInputChange}
                placeholder="Ingresa tu email!" 
            />

            <button 
                className="button"
                type="submit"
                disabled={loading}
            >
                Enviar
            </button>

            <p 
                className="container__text"
                onClick={toSignin}
            >
                Deseas iniciar sesion?
            </p>
        </form>
    )
}
