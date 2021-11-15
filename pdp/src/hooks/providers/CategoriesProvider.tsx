import React from 'react'
import { Category } from '@types'
import { useCategories } from '@hooks'

export type AppCategoriesContextProps = {
    categories: Category[]
    getCategoryById: (id: string) => Category | undefined
    resetCategories: () => void
    addCategories: (...Categories: Category[]) => void
    isLoading: boolean
}

export const AppCategoriesContext = React.createContext({} as AppCategoriesContextProps)
export const useAppCategories = () => {
    const CategoriesContext = React.useContext(AppCategoriesContext)

    if(!CategoriesContext){
        throw new Error('Please wrap your application within AppCategoriesProvider')
    }

    return CategoriesContext
}

export type AppCategoriesProviderProps = {
    children: React.ReactElement
}

export const AppCategoriesProvider: React.FC<AppCategoriesProviderProps> = ({children}) => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const [isLoading, setIsLoading] = React.useState<boolean>(true)
    const {getCategories} = useCategories()

    const resetCategories = React.useCallback(() => setCategories(() => []),[setCategories])
    
    const addCategories = React.useCallback((...newCategories: Category[]) => {
        return setCategories((categories) => [...categories, ...newCategories])
    }, [setCategories])

    const getCategoryById = React.useCallback((id: string): Category | undefined => {
        return categories.find(category => category.id === parseInt(id))
    }, [categories])

    React.useEffect(() => {
        const fetchCategories = async () => {
            const [e, categories] = await getCategories()

            if(e){
                return console.error(e)
            }

            addCategories(...categories as Category[])
            setIsLoading(false)
        }

        fetchCategories()
        return () => resetCategories()
    }, [])

    return (
        <AppCategoriesContext.Provider value={{categories, addCategories, resetCategories, getCategoryById, isLoading}}>
            {children}
        </AppCategoriesContext.Provider>
    )
} 

export default AppCategoriesProvider