import { Optional, Transaction } from "sequelize";
import Inventory from "../models/inventory";

export interface IInventoryRepository {
    findByProductId(productId: string): Promise<Inventory[]>;
    getProductBatchesForTx(query: object): Promise<Inventory[]>;
    findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null>;
    getAllInventories(): Promise<InventoryResponse[]>;
    getProductDetails(productId: string): Promise<InventoryResponse>;
    create(inventoryData: InventoryCreationAttributes): Promise<Inventory>;
    update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<void>;
    delete(id: string): Promise<void>;
}

export interface InventoryAttributes {
    id: string;
    productId: string;
    quantity: number;
    location?: string; // Optional location
    batchNo: string;
}

export interface InventoryCreationAttributes extends Optional<InventoryAttributes, "id"> { }

export interface InventoryResponse {
    id: string;
    productId: string;
    totalQuantity: number;
    productName: string;
    productPrice: number;
    companyName?: string;
}