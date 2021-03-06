import React from 'react'
import Layout from '@components/shared/Layout'
import { Flex, Text, Heading, Button, Icon, VStack, useToast, Grid } from '@chakra-ui/react'
import { MdEmail as EmailIcon, MdLock as PasswordIcon} from 'react-icons/md'
import {FcGoogle as GoogleIcon} from 'react-icons/fc'
import {SiTwitter as TwitterIcon} from 'react-icons/si'
import Field from '@components/shared/Field'
import { useFormValues, useAuth } from '@hooks'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().test((value) => /\w{8,}/.test(value as string))
})

const SignIn = () => {
    const {signIn, signInWithGoogle, signInWithTwitter} = useAuth()
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

    const onClickSignIn = React.useCallback(async () => {
            const credentials = {
                email: formValues.email.value,
                password: formValues.password.value,
            }

            const [validationError] = await validateFormFields(credentials)
            if(validationError){
                return toast({description: validationError.message})
            }


            const [e] = await signIn(formValues.email.value, formValues.password.value)
            if(e){
                return
            }

            return navigate('/')
    }, [formValues.email.value, formValues.password.value, toast])  

    const onClickSignUp = React.useCallback(() => {
        navigate('/sign-up')
    }, [navigate])

    const onClickSignInWithGoogle = React.useCallback(async () => {
        const [e] = await signInWithGoogle()
        if(e){
            return
        }

        navigate('/')
    }, [navigate, signInWithGoogle])


    const onClickSignInWithTwitter = React.useCallback(async () => {
        const [e] = await signInWithTwitter()
        if(e){
            return
        }

        navigate('/')
    }, [navigate, signInWithTwitter])

    return (
        <Layout>
            <Flex w="100%" alignItems="flex-start" justifyContent="center" p="2rem" bg="gray.50" h="calc(100vh - 72px)">
                <VStack mt="4rem" p="2.5rem" minW="700px" >
                    <VStack as="form" spacing="1.5rem" w="100%" maxW="400px">
                        <Heading as="h1" color="gray.600" fontSize="2.5rem">Welcome back</Heading>
                        <VStack spacing="1rem" w="100%">
                            <Text color="gray.500">Use an existing account</Text>
                            <Grid w="100%" templateColumns="repeat(auto-fit, minmax(100px,1fr))" gridColumnGap="0.5rem" >
                                <Button variant="outline" leftIcon={<Icon as={GoogleIcon}/>} onClick={onClickSignInWithGoogle}/>
                                <Button variant="outline" leftIcon={<Icon as={TwitterIcon} color="#1d9bf0"/>} onClick={onClickSignInWithTwitter}/>
                            </Grid>
                        </VStack>
                        <VStack>
                            <Text color="gray.500">or sign in with</Text>
                        </VStack>
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
                        <Button colorScheme="teal" onClick={onClickSignIn} isFullWidth>Sign In</Button>
                        <VStack>
                            <Text color="gray.500">or sign up with</Text>
                        </VStack>
                        <Button colorScheme="teal" onClick={onClickSignUp} isFullWidth>Sign Up</Button>                        
                    </VStack>
                </VStack>
            </Flex>
        </Layout>
    )
}

export default SignIn