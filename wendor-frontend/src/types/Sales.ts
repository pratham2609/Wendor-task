export interface Order {
    id: string;
    totalPrice: string;
    products: OrderProduct[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrdersRes {
    orders: Order[];
    totalCount: number;
}

export interface OrderProduct {
    name: string;
    price: number;
    quantity: number;
    display_image_url: string;
}