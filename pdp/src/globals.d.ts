/// <reference types="react"/>

declare const REACT_APP_API_KEY: string
declare const REACT_APP_AUTH_DOMAIN: string
declare const REACT_APP_PROJECT_ID: string
declare const REACT_APP_STORAGE_BUCKET: string
declare const REACT_APP_MESSAGING_SENDER_ID: string
declare const REACT_APP_APP_ID: string

declare module 'home/components/Header' {
    const Header: React.FC<{
        onClickHome: () => void
        onClickSignIn: () => void
    }>

    return Header
}