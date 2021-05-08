import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { SigninScreen } from '../pages/auth/SigninScreen'
import { SignupScreen } from '../pages/auth/SignupScreen'
import { ResetPassScreen } from '../pages/auth/ResetPassScreen'
import { ForgotPassScreen } from '../pages/auth/ForgotPassScreen'

export const AuthRouter = () => {
    return (
        <>
            <Switch>
                <Route
                    exact
                    path="/auth/signin"
                    component={SigninScreen}
                />

                <Route
                    exact
                    path="/auth/signup"
                    component={SignupScreen}
                />

                <Route
                    exact
                    path="/auth/forgot"
                    component={ForgotPassScreen}
                />

                <Route
                    exact
                    path="/auth/reset"
                    component={ResetPassScreen}
                />

                <Redirect to="/auth/signin" />

            </Switch>
        </>
    )
}
