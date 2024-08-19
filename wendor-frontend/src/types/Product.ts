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
    display_image_url: string;
    barcodeNo: string;
}

export interface ProductCreation {
    name: string;
    category: string;
    company_name: string;
    price: number;
    barcodeNo: string;
    companyId?: string;
    display_image_url?: string
    display_image_file?: string
}

export interface ProductCompanies {
    company_name: string;
    name: string;
    id: string
}

export interface SearchProduct {
    productId: string;
    productName: string;
}