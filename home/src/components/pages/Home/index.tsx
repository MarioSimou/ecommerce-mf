import React from 'react'
import Layout from '@components/shared/Layout'
import {
    Image,
    VStack,
    Flex
} from '@chakra-ui/react'
import Carousel from '@components/pages/Home/components/Carousel'

const carouselImages = [
    'https://www.purpicks.com/wp-content/uploads/2018/06/w3llpeople-Realist-Invisible-Setting-Powder.jpg',
    'https://www.purpicks.com/wp-content/uploads/2018/02/Ombre-Amazonie-CC.png',
    'https://www.purpicks.com/wp-content/uploads/2018/06/Zorah-Biocosmetiques-Liquid-Liner.png',
    'https://cdn.shopify.com/s/files/1/1338/0845/collections/blottedlip-lippie-stix_grande.jpg?v=1512588803',
    'https://cdn.shopify.com/s/files/1/1338/0845/products/brain-freeze_a_800x1200.jpg?v=1502255076',
    'https://cdn.shopify.com/s/files/1/1338/0845/collections/lippie-pencil_grande.jpg?v=1512588769'
]

const Home = () => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

    React.useEffect(() => {
        const fn = () => setSelectedIndex((selectedIndex) => {
            if(selectedIndex === (carouselImages.length-1)){
                return 0
            }
            return ++selectedIndex
        })
        setInterval(fn,5000)

        return () => setSelectedIndex(() => 0)
    }, [])

    return (
        <Layout>
            <VStack>
                <Carousel items={carouselImages}/>
            </VStack>
        </Layout>
    )
}

export default Home