import regeneratorRuntime from "regenerator-runtime";
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom'
import Products from '@components/pages/Products'
import Product from '@components/pages/Product'
import Categories from '@components/pages/Categories'
import { FirebaseOptions, getApp, initializeApp } from 'firebase/app'
import { AppProductsProvider  } from '@providers'
import AppCategoriesProvider from 'src/hooks/providers/CategoriesProvider'

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
            <AppCategoriesProvider>
                <AppProductsProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/categories" element={<Categories/>}/>
                            <Route path="/categories/:categoryId" element={<Products/>}/>
                            <Route path="/categories/:categoryId/:productId" element={<Product/>}/>
                        </Routes>
                    </BrowserRouter>
                </AppProductsProvider>
            </AppCategoriesProvider>
        </ChakraProvider>
    )
}

export default App