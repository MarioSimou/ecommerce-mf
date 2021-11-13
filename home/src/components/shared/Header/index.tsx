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

export type Props = {
    onClickHome: () => void
    onClickSignIn: () => void
}

const Header: React.FC<Props> = ({
    onClickHome,
    onClickSignIn,
}) => {
    return (
        <Flex as="header" w="100%" p="1rem 2rem" bg="blackAlpha.200" alignItems="center" justifyContent="space-between" >
            <Flex>
                <Icon as={Logo} w={5} h={5}/>
            </Flex>
            <Flex>
                <Menu isLazy>
                    <MenuButton as={IconButton} icon={<MenuIcon/>} variant="outline" aria-label="Menu"/>
                    <MenuList>
                        <MenuItem icon={<HomeIcon/>} onClick={onClickHome}>Home</MenuItem>
                        <MenuItem icon={<LoginIcon/>} onClick={onClickSignIn}>Sign In</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </Flex>
    )
}

export default Header