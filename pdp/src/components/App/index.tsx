import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Products from '@components/pages/Products'
import Product from '@components/pages/Product'

const App = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/products" element={<Products/>}/>
                    <Route path="/products/:id" element={<Product/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App