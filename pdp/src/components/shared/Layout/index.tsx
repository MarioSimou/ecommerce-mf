import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import Header from 'home/components/Header'
import { ErrorBoundary } from 'react-error-boundary'

export type Props = {
    children: React.ReactElement
}

const Layout: React.FC<Props> = ({children}) => {
    const onClickHome = () => window.location.href = 'http://localhost:3000/'
    const onClickSignIn = () => window.location.href = 'http://localhost:3000/sign-in'

    return (
        <Flex flexDirection="column">
            <ErrorBoundary fallback={<Spinner/>}>
                <Header onClickHome={onClickHome} onClickSignIn={onClickSignIn}/>
            </ErrorBoundary>
            {children}
        </Flex>
    )
}

export default Layout