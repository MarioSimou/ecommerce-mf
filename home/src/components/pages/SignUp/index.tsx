import React from 'react'
import Layout from '@components/shared/Layout'
import { Flex, Heading, Button, Icon, VStack, useToast } from '@chakra-ui/react'
import { MdEmail as EmailIcon, MdLock as PasswordIcon} from 'react-icons/md'
import Field from '@components/shared/Field'
import { useFormValues, useAuth } from '@hooks'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().test((value) => /\w{8,}/.test(value as string))
})

const SignUp = () => {
    const {signUp} = useAuth()
    const toast = useToast({
        position: 'bottom-right',
        status: 'error',
        isClosable: true,
        title: 'Authentication',
    })
    const navigate = useNavigate()
    const {formValues, handleOnBlur, handleOnChange, validateFormFields} = useFormValues({
        email: {
            value: '',
            error: '',
            touched: false
        },
        password: {
            value: '',
            error: '',
            touched: false,
        }
    }, validationSchema)

    const onClickSignUp = React.useCallback(async () => {
            const credentials = {
                email: formValues.email.value,
                password: formValues.password.value,
            }

            const [validationError] = await validateFormFields(credentials)
            if(validationError){
                return toast({description: validationError.message})
            }

            const [e] = await signUp(credentials.email, credentials.password)
            if(e){
                return
            }

            return navigate('/')
    }, [formValues.email.value, formValues.password.value, toast])  

    return (
        <Layout>
            <Flex w="100%" alignItems="flex-start" justifyContent="center" p="2rem" bg="gray.50" h="calc(100vh - 72px)">
                <VStack mt="4rem" p="2.5rem" minW="700px" >
                    <VStack as="form" spacing="1.5rem" w="100%" maxW="400px">
                        <Heading as="h1" color="gray.600" fontSize="2.5rem">Sign Up</Heading>
                        <VStack spacing="2rem" w="100%">
                            <Field id="email"
                                label="Your email"
                                type="text"
                                onChange={handleOnChange}
                                onBlur={handleOnBlur}
                                icon={<Icon as={EmailIcon}/>}
                                value={formValues.email.value}
                                error={formValues.email.error}
                                touched={formValues.email.touched}
                                required
                                />
                            <Field id="password"
                                label="Your password"
                                type="password"
                                onChange={handleOnChange}
                                onBlur={handleOnBlur}
                                icon={<Icon as={PasswordIcon}/>}
                                value={formValues.password.value}
                                error={formValues.password.error}
                                touched={formValues.password.touched}
                                required
                                />
                        </VStack>
                        <Button colorScheme="teal" onClick={onClickSignUp} isFullWidth>Register</Button>
                    </VStack>
                </VStack>
            </Flex>
        </Layout>
    )
}

export default SignUp