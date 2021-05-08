import React from 'react'

export const SigninScreen = () => {
    return (
        <div className="container">
            <h1 className="container__title">Iniciar Sesion</h1>
            
            <p className="container__info">Nos encanta verte por aqui! Disfruta y comparte con nosotros.</p>

            <input className="input" type="email" name="email" autoComplete="off" placeholder="Ingresa tu email!" />

            <input className="input" type="password" name="password" placeholder="Ingresa tu contraseña!" />

            <button type="submit" className="button">
                Entrar
            </button>
            
            <p className="container__text">Olvidaste la contraseña?</p>
        </div>
    )
}
