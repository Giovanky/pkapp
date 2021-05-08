import React from 'react'

export const SignupScreen = () => {
    return (
        <div className="container">
            <h1 className="container__title">Registrarse</h1>

            <p className="container__info">Acompañamos y descubre todo lo que tenemos para ofrecer!. Asegurate de confirmar la cuenta de usuario.</p>

            <input className="input" type="text" name="name" autoComplete="off" placeholder="Ingresa tu nombre!" />

            <input className="input" type="email" name="email" autoComplete="off" placeholder="Ingresa tu email!" />

            <input className="input" type="phone" name="phone" autoComplete="off" placeholder="Ingresa tu telefono!" />

            <input className="input" type="password" name="password" placeholder="Ingresa tu contraseña!" />

            <input className="input" type="password" name="re-password" placeholder="Repite tu contraseña!" />

            <button className="button">
                Registrarse
            </button>
        </div>
    )
}
