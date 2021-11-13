import React from 'react'
import { User } from 'firebase/auth'

export type AppAuthContextProps = {
    currentUser: User | undefined 
    setUser: (user: User) => void
    resetUser: () => void
}

export const AuthContext = React.createContext({} as AppAuthContextProps)
export const useAppAuth = () => React.useContext(AuthContext)

export type Props = {
    children: React.ReactElement
}

export const AppAuthProvider: React.FC<Props> = ({
    children
}) => {
    const [currentUser, setCurrentUser] = React.useState<User | undefined>()

    const setUser = React.useCallback((user: User) => {
        return setCurrentUser(() => user)
    }, [setCurrentUser])

    const resetUser = React.useCallback(() => {
        return setCurrentUser(() => undefined)
    }, [setCurrentUser])

    return (
        <AuthContext.Provider value={{currentUser,setUser, resetUser}}>
            {children}
        </AuthContext.Provider>
    )
}
