import React from 'react'
import {
    FormControl,
    FormLabel, 
    Collapse,
    FormErrorMessage, 
    Input,
    InputLeftElement,
    InputGroup,
} from '@chakra-ui/react'

export type Props = {
    id: string
    label: string
    type?: string
    placeholder?: string
    icon?: React.ReactNode
    value: string
    error: string | undefined
    touched: boolean | undefined
    required?: boolean 
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Field: React.FC<Props> = ({
    id,
    error,
    label,
    type = 'text',
    placeholder = '',
    touched,
    value,
    required = false,
    icon,
    onChange,
    onBlur
}) => {
    return (
        <FormControl id={id} isRequired={required} isInvalid={Boolean(touched && error)}>
            <FormLabel textTransform="uppercase" color="gray.500" letterSpacing="wide" fontSize="0.9rem">{label}</FormLabel>
            <InputGroup>
                {icon && <InputLeftElement pointerEvents="none" children={icon}/>}
                <Input type={type} variant="filled" value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur}/>
            </InputGroup>
            <Collapse in={Boolean(touched && error)}>
                <FormErrorMessage>{error}</FormErrorMessage>
            </Collapse>
        </FormControl>
    )
}
export default Field