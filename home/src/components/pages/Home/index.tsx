import React from 'react'
import Layout from '@components/shared/Layout'
import {
    VStack,
    Flex,
    Heading,
    Collapse,
    Text,
    Spinner
} from '@chakra-ui/react'
import Carousel from '@components/pages/Home/components/Carousel'
import CategoryCard from 'pdp/components/CategoryCard'
import { Category } from '@types'

const carouselImages = [
    'https://www.purpicks.com/wp-content/uploads/2018/06/w3llpeople-Realist-Invisible-Setting-Powder.jpg',
    'https://www.purpicks.com/wp-content/uploads/2018/02/Ombre-Amazonie-CC.png',
    'https://www.purpicks.com/wp-content/uploads/2018/06/Zorah-Biocosmetiques-Liquid-Liner.png',
    'https://cdn.shopify.com/s/files/1/1338/0845/collections/blottedlip-lippie-stix_grande.jpg?v=1512588803',
    'https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076',
    'https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769'
]

const categories = [
    {
        "id": 1,
        "name": "Lip Gloss",
        "image": "https://www.purpicks.com/wp-content/uploads/csm/sunset-bronze-pennylaneorganics1.jpg"
    },
    {
        "id": 2,
        "name": "Powder",
        "image": "https://www.purpicks.com/wp-content/uploads/2018/03/rejuva-minerals-bronzer.jpg"
    },
    {
        "id": 3,
        "name": "Lipstick",
        "image": "https://www.purpicks.com/wp-content/uploads/2018/06/Nudus-Amalia.jpg"
    }
]

const Home = () => {
    // const {isLoading, categories} = useAppCategories()
    const isLoading = false

    return (
        <Layout>
            <VStack spacing="2rem">
                <Carousel items={carouselImages}/>
                {/* <VStack p="2rem" spacing="1rem" alignItems="flex-start">
                    <Heading as="h2" fontSize="1.75rem">Choose your category</Heading>
                    <VStack spacing="1rem">
                        {isLoading && <Spinner size="xl"/>}
                        <Collapse in={categories.length === 0 && !isLoading}>
                            <Text>Categories not found</Text>
                        </Collapse> 
                        <Collapse in={categories.length > 0 && !isLoading} style={{width: '100%'}}>
                            <Flex gridGap="1rem" flexWrap="wrap" justifyContent="flex-start" w="100%">
                                {(categories as Category[]).map(category => {
                                    return (<CategoryCard key={category.id} category={category}/>)
                                })}
                            </Flex>
                        </Collapse>
                    </VStack>
                </VStack> */}
            </VStack>
        </Layout>
    )
}

export default Home