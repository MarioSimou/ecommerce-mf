import React from 'react'
import { Box, Collapse, Flex, Spinner, VStack, Text, Grid, Heading } from '@chakra-ui/react'
import { useCategories } from '@hooks'
import { Category } from '@types'
import mockCategories from '../../../mock/categories.json'
import CategoryCard from '@components/pages/Categories/components/CategoryCard'
import Layout from '@components/shared/Layout'
import { useAppCategories } from 'src/hooks/providers/CategoriesProvider'
import { useNavigate } from 'react-router-dom'

const Categories = () => {
    const {categories, isLoading} = useAppCategories()
    const navigate = useNavigate()

    // React.useEffect(() => {
    //     const uploadCategories = async () => {
    //         await addCategories(...mockCategories)
    //     }
    //     uploadCategories()
    // }, [])

    return (
        <Layout breadcrumbItems={[{name: 'Categories', href: '/categories'}]}>
            <VStack p="2rem" spacing="1rem" alignItems="flex-start">
                <Heading as="h2" fontSize="1.75rem">Choose your category</Heading>
                <VStack spacing="1rem">
                    {isLoading && <Spinner size="xl"/>}
                    <Collapse in={categories.length === 0 && !isLoading}>
                        <Text>Categories not found</Text>
                    </Collapse> 
                    <Collapse in={categories.length > 0 && !isLoading} style={{width: '100%'}}>
                        <Flex gridGap="1rem" flexWrap="wrap" justifyContent="flex-start" w="100%">
                            {categories.map(category => {
                                const onClick = () => navigate(`/categories/${category.id}`)
                                return (<CategoryCard key={category.id} onClick={onClick} category={category}/>)
                            })}
                        </Flex>
                    </Collapse>
                </VStack>
            </VStack>
        </Layout>
    )
}

export default Categories