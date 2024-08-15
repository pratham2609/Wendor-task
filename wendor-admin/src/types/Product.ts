export interface ProductRes {
    products: Product[];
    totalCount: number;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    companyName: string;
    price: number;
    createdAt: Date;
    display_image_url: string
}
