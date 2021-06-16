import React from 'react'
import { isEmail } from 'validator'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { initRegister } from '../../actions/auth'
import { deleteMessage, setMessage } from '../../actions/ui'
import { useHistory } from 'react-router-dom'
import { UiMessage } from '../../components/UiMessage'

export const SignupScreen = () => {
    const {loading} = useSelector(state => state.ui)
    const history = useHistory()
    const dispatch = useDispatch()

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: '' 
    })

    const {name, email, password, password2} = values

    const handleSignup = (e) => {
        e.preventDefault()
        if(isFormValid()){
            dispatch(initRegister(name, email, password))
        }

    }

    const isFormValid = () => {
        if(name.trim().length === 0){
            dispatch(setMessage('El nombre es obligatorio!', 'alert'))
            return false
        }else if(!isEmail(email)){
            dispatch(setMessage('No es un email valido!', 'alert'))
            return false
        }else if(password.trim() !== password2.trim() && password.length > 8){
            dispatch(setMessage('La contraseña debe poseer minimo 8 digitos y deben coincidir!', 'alert'))
            return false
        }
        dispatch(deleteMessage())
        return true
    }

    const toSignin = () => {
        dispatch(deleteMessage())
        history.replace('/auth/signin')
    }

    return (
        <form 
            className="container"
            onSubmit={handleSignup}
        >
            <h1 className="container__title">
                Registrarse
            </h1>

            <UiMessage />

            <p className="container__info">
                Acompañanos y descubre todo lo que tenemos para ofrecer!. Asegurate de confirmar la cuenta de usuario.
            </p>

            <input className="input" 
                value={name} 
                type="text" 
                name="name" 
                autoComplete="off" 
                placeholder="Ingresa tu nombre!" 
                onChange={handleInputChange}
            />

            <input 
                className="input" 
                value={email} 
                type="text" 
                name="email" 
                autoComplete="off" 
                placeholder="Ingresa tu email!"
                onChange={handleInputChange}
            />

            <input 
                className="input" 
                value={password} 
                type="password" 
                name="password" 
                placeholder="Ingresa tu contraseña!"
                onChange={handleInputChange}    
            />

            <input 
                className="input" 
                value={password2} 
                type="password" 
                name="password2" 
                placeholder="Repite tu contraseña!" 
                onChange={handleInputChange}
            />

            <button 
                className="button"
                type="submit"
                disabled={loading}
            >
                Registrarse
            </button>

            <p 
                className="container__text"
                onClick={toSignin}
            >
                Quieres iniciar sesion?
            </p>            
        </form>
    )
}