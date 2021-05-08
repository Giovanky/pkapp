import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { SelectorScreen } from '../pages/pkdex/SelectorScreen'

export const AppRouter = () => {
    return (
        <Router>
            <>
                <Switch>
                    <Route 
                        path="/auth"
                        component={ AuthRouter }
                    />

                    <Route 
                        exact
                        path="/"
                        component={ SelectorScreen }
                    />

                    <Redirect to="/auth/signin" />


                </Switch>
            </>
        </Router>
    )
}
