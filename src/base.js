import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseApp = firebase.initializeApp({
    // apiKey: "AIzaSyBD-t43Fambx19lJ2yp_pQPHWIX9I8zId8",
    // authDomain: "reacttodo-de147.firebaseapp.com",
    // projectId: "reacttodo-de147",
    // storageBucket: "reacttodo-de147.appspot.com",
    // messagingSenderId: "857792813052",
    // appId: "1:857792813052:web:7edac206473922d31dc479"

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_API
});

//Below initializes the authentication fucntionality in a Firebase app
export const authResult = firebase.auth();
export default firebaseApp;