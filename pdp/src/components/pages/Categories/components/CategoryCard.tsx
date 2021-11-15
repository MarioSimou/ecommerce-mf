import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '@types'
import { Box, Image, Heading, Flex}  from '@chakra-ui/react'
import notFoundFallback from '@public/notFound.png'

export type Props = {
    category: Category
}

const CategoryCard: React.FC<Props> = ({category}) => {
    return (
        <Link to={`/categories/${[category.id]}`}>
            <Flex position="relative" width="250px" height="250px" borderColor="gray.200" borderWidth="1px">
                <Image src={category.image} fallbackSrc={notFoundFallback} alt={category.name} boxSize="100%" objectFit="cover"/>
                <Flex bg="white" position="absolute" bottom="0" left="0" width="100%" alignItems="center" justifyContent="center" padding="1rem">
                    <Heading as="h3" fontSize="1.5rem" color="gray.700">{category.name}</Heading>
                </Flex>
            </Flex>
        </Link>
    )
}

export default CategoryCard