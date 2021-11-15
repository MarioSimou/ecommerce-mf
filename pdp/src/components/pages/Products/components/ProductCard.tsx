import React from 'react'
import { Link } from 'react-router-dom'
import { Category, Product } from '@types'
import { Grid, Box, Image, Heading, VStack, Flex, Text, Tag}  from '@chakra-ui/react'
import notFoundFallback from '@public/notFound.png'

export type Props = {
    product: Product
    category: Category
}

const ProductCard: React.FC<Props> = ({product, category}) => {
    return (
        <Link to={`/categories/${category.id}/${[product.id]}`}>
                                <Grid gridAutoFlow="row" gridTemplateRows="150px 1fr" key={product.id} borderColor="gray.200" borderWidth="1px">
                                    <Box w="100%">
                                        <Image src={product.image_link} fallbackSrc={notFoundFallback} alt={product.name} boxSize="100%" objectFit="cover"/>
                                    </Box>
                                    <VStack alignItems="flex-start" p="1rem" bg="gray.100">
                                        <Heading as="h3" fontSize="1.15rem" color="gray.500" fontWeight={500}>{product.name}</Heading>
                                        {product.category && <Tag colorScheme="teal" variant="outline">{product.category}</Tag>}
                                        <Flex flexWrap="wrap" gridGap="0.5rem">
                                            {product.tag_list?.slice(0,3)?.map(tag => {
                                                return (<Tag key={tag} variant="outline" colorScheme="teal">{tag}</Tag>)
                                            })}
                                        </Flex>
                                    </VStack>
                                </Grid>
                            </Link>
    )
}

export default ProductCard