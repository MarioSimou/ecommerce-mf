import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Category } from '@types'
import { Image, Heading, Flex}  from '@chakra-ui/react'
import notFoundFallback from '@public/notFound.png'
import { useNavigate } from 'react-router-dom'

export type Props = {
    category: Category,
    onClick: () => void
}

const CategoryCard: React.FC<Props> = ({category, onClick}) => {
    return (
        <Flex position="relative" width="250px" height="250px" borderColor="gray.200" borderWidth="1px" onClick={onClick}>
            <Image src={category.image} fallbackSrc={notFoundFallback} alt={category.name} boxSize="100%" objectFit="cover"/>
            <Flex bg="white" position="absolute" bottom="0" left="0" width="100%" alignItems="center" justifyContent="center" padding="1rem">
                <Heading as="h3" fontSize="1.5rem" color="gray.700">{category.name}</Heading>
            </Flex>
        </Flex>
    )
}

export default CategoryCard