import React from 'react'
import { FormOptions } from '@types'
import { ObjectSchema, ObjectShape, AnyObjectSchema, ValidationError } from 'yup'
import { toast } from '@chakra-ui/react'


export const useFormValues = (initialValues: FormOptions, validationSchema: AnyObjectSchema) => {
    const [formValues, setFormValues] = React.useState<FormOptions>(initialValues)

    const setValue = React.useCallback((id: string, value: string) => {
        return setFormValues(formValues => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                value,
                touched: true
            }
        }))
    }, [setFormValues])

    const setError = React.useCallback((id: string, error: string) => {
        return setFormValues(formValues => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                error,
                touched: true
            }
        }))
    }, [setFormValues])

    const resetError = React.useCallback((id: string) => {
        return setFormValues(formValues => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                error: '',
                touched: true
            }
        }))
    }, [setFormValues])

    const setTouched = React.useCallback((id: string) => {
        return setFormValues(formValues => ({
            ...formValues,
            [id]: {
                ...formValues[id],
                touched: true
            }
        }))
    }, [setFormValues])

    const handleOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, id } = e.currentTarget

        try {            
            validationSchema.validateSyncAt(id, {[id]: value})
            resetError(id)
            return setValue(id, value)
        }catch(e){
            setValue(id, value)
            return setError(id, e.message)
        }
    }, [setValue, setError, resetError])

    const handleOnBlur = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        return setTouched(e.currentTarget.id)
    }, [])

    const validateFormFields = React.useCallback(async (formValues: {[f in string]: string}): Promise<[Error | undefined]> => {
        try {
            Object.entries(formValues).forEach(([fieldName, value]) => setValue(fieldName, value))

            await validationSchema.validate(formValues)
            return [undefined]
        }catch(e){
            setError(e.path, e.message)
            return [e]
        }
    }, [setValue, setError])


    return {
        formValues,
        setValue,
        setError,
        setTouched,
        handleOnBlur,
        handleOnChange,
        validateFormFields,
    }
}

export default useFormValues