import React from 'react'
import {Breadcrumb as ChakraBreadcrumb, BreadcrumbItem, BreadcrumbLink, Collapse, BreadcrumbProps} from '@chakra-ui/react'
import {Link} from 'react-router-dom'

export type Item = {
    href: string
    name: string
}

export type Props = {
    items?: Item[]
} & BreadcrumbProps

const Breadcrumb: React.FC<Props> = ({items = [], ...other}) => {
    return (
        <Collapse in={items.length > 0} style={{width: '100%'}}>
            <ChakraBreadcrumb separator="/" fontWeight={600} p="0.75rem 1.25rem" bg="gray.100"  {...other}>
                {items.map((item, index) => {
                    return (
                        <BreadcrumbItem key={item.name}>
                            <BreadcrumbLink color={index === 0 ? "gray.700": "gray.500"} to={item.href} as={Link}>{item.name}</BreadcrumbLink>
                        </BreadcrumbItem>    
                    )
                })}
            </ChakraBreadcrumb>
        </Collapse>
    )
}

export default Breadcrumb