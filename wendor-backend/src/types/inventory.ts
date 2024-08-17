import { Optional } from "sequelize";
import Inventory from "../models/inventory";

export interface IInventoryRepository {
    findByInventoryId(inventoryId: string): Promise<Inventory>;
    findByProductId(productId: string): Promise<Inventory[]>;
    getProductBatchesForTx(query: object): Promise<Inventory[]>;
    findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null>;
    getAllInventories(page?: number, pageSize?: number): Promise<InventoryResponse>;
    getProductDetails(productId: string): Promise<InventoryModified>;
    getProductQuantity(productId: string): Promise<number>;
    create(inventoryData: InventoryCreationAttributes): Promise<Inventory>;
    update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<void>;
    deleteAllProductInventory(id: string): Promise<void>;
    deleteProductBatchInventory(inventoryId: string): Promise<void>;
}

export interface InventoryAttributes {
    id: string;
    productId: string;
    quantity: number;
    location?: string; // Optional location
    batchNo: string;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, "id"> { }

export interface InventoryModified {
    id: string;
    productId: string;
    totalQuantity: number;
    productName: string;
    productPrice: number;
    companyName?: string;
}

export interface InventoryResponse {
    inventory: any[],
    totalCount: number;
}