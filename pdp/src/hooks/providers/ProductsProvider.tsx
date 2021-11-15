import React from 'react'
import { Product } from '@types'
import { useProducts } from '@hooks'

export type AppProductsContextProps = {
    products: Product[]
    getProductById: (id: string) => Product | undefined
    resetProducts: () => void
    addProducts: (...products: Product[]) => void
    isLoading: boolean
}

export const AppProductsContext = React.createContext({} as AppProductsContextProps)
export const useAppProducts = () => {
    const productsContext = React.useContext(AppProductsContext)

    if(!productsContext){
        throw new Error('Please wrap your application within AppProductsProvider')
    }

    return productsContext
}

export type AppProductsProviderProps = {
    children: React.ReactElement
}

export const AppProductsProvider: React.FC<AppProductsProviderProps> = ({children}) => {
    const [products, setProducts] = React.useState<Product[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const {getProducts} = useProducts()

    const resetProducts = React.useCallback(() => setProducts(() => []),[setProducts])
    
    const addProducts = React.useCallback((...newProducts: Product[]) => {
        return setProducts((products) => [...products, ...newProducts])
    }, [setProducts])

    const getProductById = React.useCallback((id: string): Product | undefined => {
        return products.find(product => product.id === parseInt(id))
    }, [products])

    React.useEffect(() => {
        const fetchProducts = async () => {
            const [e, products] = await getProducts()

            if(e){
                return console.error(e)
            }

            addProducts(...products as Product[])
            setIsLoading(false)
        }

        fetchProducts()
        return () => resetProducts()
    }, [])

    return (
        <AppProductsContext.Provider value={{products, addProducts, resetProducts, getProductById, isLoading}}>
            {children}
        </AppProductsContext.Provider>
    )
} 

export default AppProductsProvider