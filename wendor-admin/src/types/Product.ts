export interface ProductRes {
    products: Product[];
    totalProducts: number;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    companyId: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
    display_image_url: string
}
