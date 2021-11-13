import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from '@components/pages/Home'
import SignIn from '@components/pages/SignIn'

const App = () => {
    return (
        <ChakraProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                </Routes>
            </BrowserRouter>
        </ChakraProvider>
    )
}

export default App