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

export interface SingleProductInventory {
    id: string;
    productName: string;
    quantity: string;
    productPrice: number;
    companyName: string;
    batchNo: string;
    productId: string
}