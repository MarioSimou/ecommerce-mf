/// <reference types="react"/>

declare module 'home/components/Header' {
    const Header: React.FC<{
        onClickHome: () => void
        onClickSignIn: () => void
    }>

    return Header
}