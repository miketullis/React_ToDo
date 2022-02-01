import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase";
import firebaseApp, { authResult } from "../base";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

//AuthProvider Component to house house base functionality for authentication (login, logout, and authHandler)
export function AuthProvider({ children }) {
  //hook to capture the user info
  const [currentUser, setCurrentUser] = useState();

  //hook to check in if components are loaded
  const [loading, setLoading] = useState(true);

  async function authenticate() {
    //Firebase GitHubAuthProvider object tocommunicate with GitHub's Auth app.
    const authProvider = new firebase.auth.GithubAuthProvider();

    return firebaseApp.auth().signInWithPopup(authProvider).then(authHandler);
  }

  async function authHandler(authData){
      setCurrentUser(authData.user);
      console.log(authData);
  }

    //Logout Functionality
    async function logout(){
        return firebaseApp.auth().signOut().then(
            setCurrentUser(null)
        )
    }

    //Object to pass AuthContextProvider as props
  const value = { currentUser, authenticate, logout }

 //Hook to tell app to re-render on auth info change
useEffect(() => {
   const authChange = authResult.onAuthStateChanged(user => {
       setCurrentUser(user);
       setLoading(false);
   })
   //cleanup mechanism that will unsubscribe the firebase app
   return authChange;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
