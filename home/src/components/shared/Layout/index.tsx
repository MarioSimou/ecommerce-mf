import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Flex } from '@chakra-ui/react'
import Header from '@components/shared/Header'

export type Props = {
    children: React.ReactElement
}

const Layout: React.FC<Props> = ({children}) => {
    const navigate = useNavigate()
    const onClickHome = () => navigate('/')
    const onClickSignIn = () => navigate('/sign-in')

    return (
        <Flex flexDirection="column">
            <Header onClickHome={onClickHome} onClickSignIn={onClickSignIn}/>
            {children}
        </Flex>
    )
}

export default Layout