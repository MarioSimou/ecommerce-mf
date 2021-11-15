import React from 'react'
import Layout from '@components/shared/Layout'
import { useAppProducts, useProducts, useAppCategories} from '@hooks'
import { useParams } from 'react-router-dom'
import { Product as ProductT, Category } from '@types'
import { Flex, Box, VStack, Image, Grid, Collapse, Text, Heading, Tag, Link as ChakraLink  } from '@chakra-ui/react'
import notFoundFallback from '@public/notFound.png'
import Label from '@components/pages/Product/components/Label'
import Breadcrumb, {Item} from '@components/shared/Breadcrumb'

const Product: React.FC = () => {
    const { categories } = useAppCategories()
    const { getProduct } = useProducts()
    const {getProductById, addProducts, resetProducts} = useAppProducts()
    const {productId, categoryId} = useParams()

    const category = React.useMemo((): Category | undefined => {
        if(!categoryId){
            return undefined
        }

        return categories.find(category => category.id === parseInt(categoryId)) as Category
    }, [categories])

    const product = React.useMemo(() => {
        if(!productId){
            return undefined
        }
        return getProductById(productId)
    }, [productId])

    const breadcrumbItems = React.useMemo(() => {
        if(!product){
            return []
        }

        return [
            {name: 'Categories', href: '/categories'},
            {name: category?.name, href: `/categories/${category?.id}`},
            {name: product.name, href: `/categories/${category?.id}/${product.id}`},
        ] as Item[]
    }, [product])

    return (
        <Layout breadcrumbItems={breadcrumbItems}>
            <VStack spacing="1rem" padding="2rem">
                <Collapse in={!product}>
                    <Text>Product not found</Text>
                </Collapse>
                <Collapse in={Boolean(product)}>
                    {product && category && <Grid gridGap="2rem" gridTemplateColumns={["1fr", "1fr", "300px 1fr", "300px 1fr"]}>
                        <Box>
                            <Image src={product.image_link} fallbackSrc={notFoundFallback} alt={product.name}  />
                        </Box>
                        <VStack spacing="1.5rem" alignItems="flex-start">
                            <Heading fontSize="1.75rem" color="gray.700">{product.name}</Heading>
                            <VStack spacing="1rem" alignItems="flex-start">
                                <Label label="Description:">
                                    <Text color="gray.500" dangerouslySetInnerHTML={{__html: product.description}}/>
                                </Label>
                                <Label label="Type:">
                                    <Text color="gray.500">{product.product_type}</Text>
                                </Label>
                                <Label label="Price:">
                                    <Text color="gray.500">{`${product.price} ${product.price_sign}`}</Text>
                                </Label>
                                {product.category && <Label label="Category:">
                                    <Tag colorScheme="teal" variant="outline">{product.category}</Tag>
                                </Label>}
                                <Label label="Tags:">
                                    <Flex flexWrap="wrap" gridGap="1rem">
                                        {product.tag_list.map(tag => {
                                            return (<Tag key={tag} variant="outline" colorScheme="teal">{tag}</Tag>)
                                        })}
                                    </Flex>
                                </Label>
                                <Label label="Provider Link:">
                                    <ChakraLink href={product.product_link}>{product.product_link}</ChakraLink>
                                </Label>
                                <Label label="Created At:">
                                    <Text color="gray.500">{new Date(product.created_at).toUTCString()}</Text>
                                </Label>
                                <Label label="Updated At:">
                                    <Text color="gray.500">{new Date(product.updated_at).toUTCString()}</Text>
                                </Label>
                            </VStack>
                        </VStack>
                    </Grid>}
                </Collapse>
            </VStack>
        </Layout>
    )
}

export default Product