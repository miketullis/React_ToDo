import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Route, Redirect } from 'react-router-dom'

//Below, we pass the component that will try to be rendered to the virtual DOM. It also includes ...rest, which is a spread operator. This passes all the props as they are passed into their components, without having to list all of the values of those props explicitly. We will see more spread operators as we get to CRUD functionality.

export default function PrivateRoute({component: Component, ...rest}) {
    const {currentUser} =  useAuth();

    return (
        //Route element to render if a currentUser authenticated. If not authentcated, then we redirect to the Login component
        <Route {...rest} render={props =>{
            return currentUser ? 
            <Component {...props} /> :
            <Redirect to="/login"/>
        }}>
        </Route>
    )
}
