import React from 'react'
import {
    Image,
    Flex,
    Box
} from '@chakra-ui/react'

export type Props = {
    items: string[]
}

const Carousel: React.FC<Props> = ({items}) => {
    const [selectedIndex, setSelectedIndex] = React.useState<number>(0)

    React.useEffect(() => {
        const fn = () => setSelectedIndex((selectedIndex) => {
            if(selectedIndex === (items.length-1)){
                return 0
            }
            return ++selectedIndex
        })
        setInterval(fn,5000)

        return () => setSelectedIndex(() => 0)
    }, [])

    return (
        <Flex position="relative" height="500px" width="100%">
            {items.map((image, index) => {
                const isSelected = selectedIndex === index
                const loading = isSelected  ?"eager" : "lazy"
                const left = isSelected ? "0px" : "100vw"
                const imageSrc = isSelected ? items[selectedIndex] : undefined
                    
                return (
                    <Image key={image} 
                        src={imageSrc} 
                        loading={loading} 
                        boxSize="100%" 
                        objectFit="cover" 
                        width="100%"
                        transition="left 0.3s ease-in"
                        objectPosition="center" 
                        position="absolute" 
                        top="0"
                        left={left}/>
                )
            })}
            <Flex position="absolute" bottom="2rem" left="50%" transform="translateX(-50%)" gridGap="0.5rem">
                {items.map((item, index) => {
                    const isSelected = selectedIndex === index
                    const bg = isSelected ? "blackAlpha.500" : "blackAlpha.200"
                    const onClick = () => setSelectedIndex(() => index)

                    return <Box _hover={{cursor: 'pointer'}} as="span" key={item} bg={bg} w="1rem" h="1rem" borderRadius="full" onClick={onClick} />
                })}
            </Flex>
        </Flex>
    )
}

export default Carousel