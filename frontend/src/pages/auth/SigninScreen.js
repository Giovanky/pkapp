import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { UiMessage } from '../../components/UiMessage'
import { useForm } from '../../hooks/useForm'
import { isEmail } from 'validator'
import { deleteMessage, setMessage } from '../../actions/ui'
import { initAccountActivation, initLogin } from '../../actions/auth'
import { useParams, Redirect } from 'react-router-dom'

export const SigninScreen = () => {
    const { loading } = useSelector(state => state.ui)
    const history = useHistory()
    const dispatch = useDispatch()
    const { token } = useParams()

    useEffect(() => {

    }, [token])

    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = values

    const toForgot = () => {
        dispatch(deleteMessage())
        history.replace('/auth/forgot')
    }

    const toSignup = () => {
        dispatch(deleteMessage())
        history.replace('/auth/signup')
    }

    const handleSignin = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(initLogin(email, password))
        }
    }

    const isFormValid = () => {
        if (!isEmail(email)) {
            dispatch(setMessage('No es un email valido!', 'alert'))
            return false
        } else if (password.trim().length === 0) {
            dispatch(setMessage('Debes ingresar la contraseña!', 'alert'))
            return false
        }
        dispatch(deleteMessage())
        return true
    }

    console.log(token)
    if (token) {
        dispatch(initAccountActivation(token))
        console.log(token)
    }

    // const tokenRec = useMemo((dispatch) => {
    //     if (token) {
    //         dispatch(initAccountActivation(token))
    //         return <Redirect to="/" />
    //         console.log(token)
    //     }
    // }, [token])
    // if (!tokenRec) {
    //     return <Redirect to="/auth/signin" />
    // }

    return (
        <form
            className="container"
            onSubmit={handleSignin}
        >
            <h1 className="container__title">
                Iniciar Sesion
            </h1>

            <UiMessage />

            <p className="container__info">
                Nos encanta verte por aqui! Disfruta y comparte con nosotros.
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

            <input
                className="input"
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña!"
            />

            <button
                type="submit"
                className="button"
                disabled={loading}
            >
                Entrar
            </button>

            <button
                type="button"
                className="button"
                onClick={toSignup}
                disabled={loading}
            >
                Registrarte
            </button>

            <p
                className="container__text"
                onClick={toForgot}
            >
                Olvidaste la contraseña?
            </p>
        </form>
    )
}