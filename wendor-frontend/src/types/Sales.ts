export interface Sales {
    id: string;
    totalPrice: string;
    products: SaleProduct[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SalesRes {
    sales: Sales[];
    totalCount: number;
}

export interface SaleProduct {
    name: string;
    price: string;
    quantity: number;
}