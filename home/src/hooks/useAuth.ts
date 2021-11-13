import React from 'react'
import {getAuth, signInWithEmailAndPassword, signOut as authSignOut, User, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, TwitterAuthProvider} from 'firebase/auth'
import { useToast } from '@chakra-ui/react'
import { getFirebaseApp } from '@components/App'
import { useAppAuth } from '@providers'


type SignInResult = [ Error | undefined, undefined | User ]
type SignOutResult = [ Error | undefined ]
type SignUpResult = [ Error | undefined, undefined | User ]
type SignInWithGoogleResult = [ Error | undefined, undefined | User ]

export const useAuth = () => {
    const {currentUser, setUser, resetUser} = useAppAuth()
    const app = React.useMemo(() => getFirebaseApp(), [])
    const auth = React.useMemo(() => getAuth(app), [app])
    const toast = useToast({
        isClosable: true,
        position: 'bottom-right',
        title: 'Authentication'
    })

    const signIn = React.useCallback(async (email: string, password: string): Promise<SignInResult> => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password)
            toast({description: 'You have succesfully signed in', status: "success"})

            setUser(user)
            return [undefined, user]    
        }catch(e){
            toast({description: e.message, status: "error"})
            return [e, undefined]
        }
    }, [toast, setUser])

    const signOut = React.useCallback(async(): Promise<SignOutResult> => {
        try {
            await authSignOut(auth)

            resetUser()
            toast({status: "success", description: "You have succesfully signed out"})
            return [undefined]
        }catch(e){
            toast({description: e.message, status: "error"})
            return [e]
        }
    }, [toast, resetUser, auth])

    const signUp = React.useCallback(async (email: string, password: string): Promise<SignUpResult> => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            setUser(user)
            toast({status: 'success', description: 'You have succesfully registered'})
            return [undefined, user]
        }catch(e){
            toast({description: e.message, status: "error"})
            return [e, undefined]
        }
    }, [auth, toast, setUser])
    
    const signInWithGoogle = React.useCallback(async (): Promise<SignInWithGoogleResult>  => {
        try {
            const provider = new GoogleAuthProvider()
            provider.addScope('profile')
            provider.addScope('email')
    
            const {user} = await signInWithPopup(auth, provider)

            toast({description: 'You have succesfully signed in', status: "success"})
            setUser(user)
            
            return [undefined, user]
        }catch(e){
            toast({description: e.message, status: "error"})
            return [e, undefined]
        }
    }, [setUser, toast, auth])

    const signInWithTwitter = React.useCallback(async (): Promise<SignInWithGoogleResult>  => {
        try {
            const provider = new TwitterAuthProvider()
            provider.addScope('profile')
            provider.addScope('email')
    
            const {user} = await signInWithPopup(auth, provider)

            toast({description: 'You have succesfully signed in', status: "success"})
            setUser(user)
            
            return [undefined, user]
        }catch(e){
            toast({description: e.message, status: "error"})
            return [e, undefined]
        }
    }, [setUser, toast, auth])

    return {
        currentUser,
        signIn,
        signOut,
        signUp,
        signInWithGoogle,
        signInWithTwitter,
    }
}

export default useAuth