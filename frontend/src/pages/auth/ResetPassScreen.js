import React from 'react'

export const ResetPassScreen = () => {
    return (
        <div className="container">
            <h1 className="container__title">Crea tu nueva contraseña</h1>

            <p className="container__info">La contraseña nueva debe ser diferente a la usada anteriormente.</p>

            <input className="input" type="password" name="password" placeholder="Tu nueva contraseña!" />

            <input className="input" type="password" name="re-password" placeholder="Repitela!" />

            <button className="button">
                Enviar
            </button>
        </div>
    )
}
