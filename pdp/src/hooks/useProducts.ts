import React from 'react'
import { useToast } from '@chakra-ui/react'
import { getFirebaseApp } from '@components/App'
import { getFirestore, setDoc,doc, collection,getDocs, getDoc } from 'firebase/firestore'
import { Product } from '@types'

export type AddProductsResult = [ Error | undefined ]
export type GetProductResult = [ Error | undefined, Product | undefined ]
export type GetProductsResult = [ Error | undefined, Product[] | undefined ]

export const useProducts = () => {
    const app = React.useMemo(() => getFirebaseApp(), [])
    const firestore = React.useMemo(() => getFirestore(app), [app])
    const productsCollection = React.useMemo(() => collection(firestore, '/products'), [firestore])
    const toast = useToast({
        position: 'bottom-right',
        isClosable: true,
        title: "Products"
    })

    const getProducts = React.useCallback(async (): Promise<GetProductsResult> => {
        try {
            const docsSnapshot = await getDocs(productsCollection)
            const products = docsSnapshot.docs.map(doc => doc.data()) as Product[]
            return [undefined, products]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e, undefined]
        }
    }, [productsCollection])

    const getProduct = React.useCallback(async (id: string): Promise<GetProductResult> => {
        try {
            const docRef = doc(firestore, `/products/${id}`)
            const docSnapshot = await getDoc(docRef)
            const product = docSnapshot.data() as Product
            return [undefined, product]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e, undefined]
        }
    }, [])

    const addProducts = React.useCallback(async (...products: Product[]): Promise<AddProductsResult> => {
        try {
            for(const product of products){
                const docRef = doc(firestore, `products/${product.id}`)
                await setDoc(docRef, product)    
            }
            
            return [undefined]
        }catch(e){
            toast({description: e.message, status: 'error'})
            return [e]
        }
    }, [app])

    return {
        addProducts,
        getProducts,
        getProduct
    }
}

export default useProducts