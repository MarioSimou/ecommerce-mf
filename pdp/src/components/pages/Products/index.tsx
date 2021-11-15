import React from 'react'
import Layout from '@components/shared/Layout'
import { useAppProducts, useProducts } from '@hooks'
import { Collapse, VStack, Text, Spinner, Grid } from '@chakra-ui/react'
import ProductCard from '@components/pages/Products/components/ProductCard'
import Breadcrumb, { Item } from '@components/shared/Breadcrumb'
import mockProducts from '../../../mock/products.json'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppCategories } from '@providers'
import { Category } from '@types'

const Products = () => {
    const {categories} = useAppCategories()
    const {categoryId} = useParams()
    const {products, isLoading} = useAppProducts()
    const category = React.useMemo((): Category | undefined => {
        if(!categoryId){
            return undefined
        }

        return categories.find(category => category.id === parseInt(categoryId)) as Category
    }, [categories])

    // const {addProducts} = useProducts()


    const filteredProducts = React.useMemo(() => {
        return products.filter(product => product.category === category?.id)
    }, [products])

    const breadcrumbItems = React.useMemo(() => {
        return [
            {name: 'Categories', href: '/categories'},
            {name: category?.name, href: `/categories/${category?.id}`}
        ] as Item[]
    }, [category])

    // React.useEffect(() => {
    //     const uploadProducts = async () => {
    //         await addProducts(...mockProducts)
    //     }
    //     uploadProducts()
    // }, [])

    return (
        <Layout breadcrumbItems={breadcrumbItems}>
                <VStack p={["2rem 0","2rem 0","2rem","2rem"]}>
                {isLoading && <Spinner size="lg"/>}
                <Collapse in={filteredProducts.length === 0 && !isLoading}>
                    <Text>Products not found</Text>
                </Collapse>
                <Collapse in={filteredProducts.length > 0 && Boolean(category)} style={{width: '100%'}}>
                    {category && <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gridGap="1rem" w="100%">
                        {filteredProducts.map(product => {
                            return (
                                <ProductCard key={product.id} category={category} product={product}/>
                            )
                        })}
                    </Grid>}
                </Collapse>
                </VStack>
        </Layout>
    )
}

export default Products