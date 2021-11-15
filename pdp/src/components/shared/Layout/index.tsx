import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'
import Header from 'home/components/Header'
import { ErrorBoundary } from 'react-error-boundary'
import Breadcrumb, { Item } from '@components/shared/Breadcrumb'

export type Props = {
    children: React.ReactElement
    breadcrumbItems?: Item[]
}

const Layout: React.FC<Props> = ({children, breadcrumbItems = []}) => {
    const onClickHome = () => window.location.href = 'http://localhost:3000/'
    const onClickSignIn = () => window.location.href = 'http://localhost:3000/sign-in'

    return (
        <Flex flexDirection="column">
            <ErrorBoundary fallback={<Spinner/>}>
                <Header onClickHome={onClickHome} onClickSignIn={onClickSignIn}/>
            </ErrorBoundary>
            {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems}/>}
            {children}
        </Flex>
    )
}

export default Layout