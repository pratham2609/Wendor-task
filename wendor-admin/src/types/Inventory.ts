export interface InventoryItem {
    productId: string;
    productName: string;
    totalQuantity: string;
    productPrice: number;
    companyName: string;
}

export interface InventoryRes {
    inventory: InventoryItem[];
    totalCount: number;
}