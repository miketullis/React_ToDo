import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
//push user back to the login screen using useHistory
import { useHistory } from 'react-router';
import Profile from './Profile';

export default function Logout() {
    //we can use logout, authenticate, and currentUser in any component that is nested inside of the AuthProvider
    const {logout} =  useAuth();
    const history  = useHistory();

    function handleAuth(){
        logout();
        history.push("/");
    }

    return (
        <div className="logout text-center pt-3 dark text-white">
            <Profile />
            <button  onClick={() => handleAuth()} className="btn dark-out">Logout</button>
            {<p className='text-white mt-1'>Copyright &#169; {new Date().getFullYear()}</p>}
        </div>
    )
}