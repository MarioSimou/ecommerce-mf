import 'regenerator-runtime'
import React from 'react'
import { useToast } from '@chakra-ui/react'
import { getFirebaseApp } from '@components/App'
import { getFirestore, setDoc,doc, collection,getDocs, getDoc } from 'firebase/firestore'
import { Category } from '@types'

export type AddCategoriessResult = [ Error | undefined ]
export type GetCategoryResult = [ Error | undefined, Category | undefined ]
export type GetCategoriesResult = [ Error | undefined, Category[] | undefined ]

export const useCategories = () => {
    const app = React.useMemo(() => getFirebaseApp(), [])
    const firestore = React.useMemo(() => getFirestore(app), [app])
    const categoriesCollection = React.useMemo(() => collection(firestore, '/categories'), [firestore])
    const toast = useToast({
        position: 'bottom-right',
        isClosable: true,
        title: "Categories"
    })

    const getCategories = React.useCallback(async (): Promise<GetCategoriesResult> => {
        try {
            const docsSnapshot = await getDocs(categoriesCollection)
            const categories = docsSnapshot.docs.map(doc => doc.data()) as Category[]
            return [undefined, categories]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e, undefined]
        }
    }, [categoriesCollection])

    const getCategory = React.useCallback(async (id: string): Promise<GetCategoryResult> => {
        try {
            const docRef = doc(firestore, `/categories/${id}`)
            const docSnapshot = await getDoc(docRef)
            const category = docSnapshot.data() as Category
            return [undefined, category]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e, undefined]
        }
    }, [])

    const addCategories = React.useCallback(async (...categories: Category[]): Promise<AddCategoriessResult> => {
        try {
            for(const category of categories){
                const docRef = doc(firestore, `categories/${category.id}`)
                await setDoc(docRef, category)    
            }
            
            return [undefined]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e]
        }
    }, [app])

    return {
        addCategories,
        getCategories,
        getCategory
    }
}

export default useCategories