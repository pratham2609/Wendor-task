export interface Sales {
    id: string;
    totalPrice: string;
    products: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface SalesRes {
    sales: Sales[];
    totalCount: number;
}