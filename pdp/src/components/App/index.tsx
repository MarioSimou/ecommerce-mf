import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Products from '@components/pages/Products'
import Product from '@components/pages/Product'
import { FirebaseOptions, getApp, initializeApp } from 'firebase/app'
import { AppProductsProvider  } from '@providers'

export const APP_NAME = 'pdp'

const firebaseConfig: FirebaseOptions = {
    apiKey: REACT_APP_API_KEY,
    authDomain: REACT_APP_AUTH_DOMAIN,
    projectId: REACT_APP_PROJECT_ID,
    storageBucket: REACT_APP_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
    appId: REACT_APP_APP_ID,
}

initializeApp(firebaseConfig, APP_NAME)

export const getFirebaseApp = () => getApp(APP_NAME)

const App = () => {
    return (
        <ChakraProvider>
            <AppProductsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/:id" element={<Product/>}/>
                    </Routes>
                </BrowserRouter>
            </AppProductsProvider>
        </ChakraProvider>
    )
}

export default App