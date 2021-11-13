import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '@components/pages/Home'
import SignIn from '@components/pages/SignIn'
import SignUp from '@components/pages/SignUp'
import { initializeApp, FirebaseOptions, getApp } from 'firebase/app'
import { AppAuthProvider } from '@providers'

export const APP_NAME = 'ecommerce-mf'

const firebaseConfig: FirebaseOptions = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

export const getFirebaseApp = () => getApp(APP_NAME) 

initializeApp(firebaseConfig, APP_NAME)

const App = () => {
    return (
        <ChakraProvider>
            <AppAuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/sign-in" element={<SignIn/>}/>
                        <Route path="/sign-up" element={<SignUp/>}/>
                    </Routes>
                </BrowserRouter>
            </AppAuthProvider>
        </ChakraProvider>
    )
}

export default App