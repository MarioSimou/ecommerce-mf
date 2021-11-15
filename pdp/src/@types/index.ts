export type Product = {
    id: number
    brand: string
    name: string
    price: string
    price_sign: string
    currency: string
    image_link: string
    product_link: string
    website_link: string
    description: string
    rating: string | null
    category: number
    product_type: string
    tag_list: string[]
    created_at: string
    updated_at: string
    product_api_url: string
    api_featured_image: string
}

export type Category = {
    id: number
    name: string
    image: string
}