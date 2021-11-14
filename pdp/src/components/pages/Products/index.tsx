import React from 'react'
import Layout from '@components/shared/Layout'
import { useAppProducts, useProducts } from '@hooks'
import { Collapse, VStack, Text, Spinner, Grid } from '@chakra-ui/react'
import ProductCard from '@components/pages/Products/components/ProductCard'
// import products from '../../../products.json'

const Products = () => {
    const {products, isLoading} = useAppProducts()
    const renderedProducts = products.slice(0,10)

    // React.useEffect(() => {
    //     const uploadProducts = async () => {
    //         await addProducts(...products.slice(0,10))
    //     }
    //     uploadProducts()
    // }, [])

    return (
        <Layout>
            <VStack p="2rem">
            {isLoading && <Spinner size="lg"/>}
            <Collapse in={renderedProducts.length === 0 && !isLoading}>
                <Text>Products not found</Text>
            </Collapse>
            <Collapse in={renderedProducts.length > 0} style={{width: '100%'}}>
                <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gridGap="1rem" w="100%">
                    {renderedProducts.map(product => {
                        return (
                            <ProductCard key={product.name} product={product}/>
                        )
                    })}
                </Grid>
            </Collapse>
            </VStack>
        </Layout>
    )
}

export default Products