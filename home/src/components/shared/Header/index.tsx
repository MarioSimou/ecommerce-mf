import React from 'react'
import {Flex, Menu, MenuButton, IconButton, MenuList, MenuItem, Icon} from '@chakra-ui/react'
import { 
    HamburgerIcon as MenuIcon
} from '@chakra-ui/icons'
import {
    MdOutlineLogin as LoginIcon,
    MdHome as HomeIcon
} from 'react-icons/md'
import {SiBigcartel as Logo} from 'react-icons/si'
import { User } from 'firebase/auth'

export type Props = {
    currentUser: User | undefined
    onClickHome: () => void
    onClickSignIn: () => void
    onClickSignOut: () => void
}

const Header: React.FC<Props> = ({
    currentUser,
    onClickHome,
    onClickSignIn,
    onClickSignOut,
}) => {

    return (
        <Flex as="header" w="100%" p="1rem 2rem" bg="teal.500" alignItems="center" justifyContent="space-between">
            <Flex>
                <Icon as={Logo} w={5} h={5} color="white" onClick={onClickHome} _hover={{cursor: 'pointer'}}/>
            </Flex>
            <Flex>
                <Menu isLazy>
                    <MenuButton as={IconButton} icon={<MenuIcon color="white"/>} variant="outline" aria-label="Menu"/>
                    <MenuList>
                        <MenuItem icon={<HomeIcon/>} onClick={onClickHome}>Home</MenuItem>
                        {!currentUser &&  <MenuItem icon={<LoginIcon/>} onClick={onClickSignIn}>Sign In</MenuItem>}
                        {currentUser &&  <MenuItem icon={<LoginIcon/>} onClick={onClickSignOut}>Logout</MenuItem>}
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Header