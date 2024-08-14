import { Optional } from "sequelize";
import Inventory from "../models/inventory";

export interface IInventoryRepository {
    findByProduct(productId: string): Promise<Inventory[]>;
    findProductByBatch(productId: string, batchNo: string): Promise<Inventory[]>;
    getAllInventories(): Promise<Inventory[]>;
    create(inventoryData: InventoryCreationAttributes): Promise<Inventory>;
    update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<Inventory | null>;
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