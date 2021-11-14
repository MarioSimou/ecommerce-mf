import React from 'react'
import { VStack, Heading} from '@chakra-ui/react'

export type Props = {children: React.ReactElement, label: string}

const Label: React.FC<Props> = ({children, label}) => {
    return (
        <VStack alignItems="flex-start" spacing="0.5rem">
            <Heading fontSize="1.15rem" as="h4">{label}</Heading>
            {children}
        </VStack>
    )
}

export default Label