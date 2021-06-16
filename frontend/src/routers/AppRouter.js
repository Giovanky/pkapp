import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
    } from 'react-router-dom'
import { AuthRouter } from './AuthRouter'
import { PublicRoutes } from './PublicRoutes'
import { PrivateRoutes } from './PrivateRoutes'
import { SigninScreen } from '../pages/auth/SigninScreen'
import { SelectorScreen } from '../pages/pkdex/SelectorScreen'
 

export const AppRouter = () => {
    return (
        <Router>
            <>
            <Switch>
                    <PublicRoutes 
                        exact
                        path="/auth/signin" 
                        component={SigninScreen} 
                        // isAuthenticated={user.logged} 
                    /> 

                    <PrivateRoutes 
                        path="/" 
                        component={SelectorScreen} 
                        // isAuthenticated={user.logged} 
                    />  
                </Switch>
            </>
        </Router>
    )
}
