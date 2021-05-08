import React from 'react'

export const ForgotPassScreen = () => {
    return (
        <div className="container">
            <h1 className="container__title">Olvidaste la contraseña?</h1>

            <p className="container__info">Te enviaremos un correo con los pasos que debes seguir para cambiar la contraseña. Asegurate de revisar la carpeta de spam.</p>

            <input className="input" type="email" name="email" autoComplete="off" placeholder="Ingresa tu email!" />

            <button className="button">
                Enviar
            </button>
        </div>
    )
}
