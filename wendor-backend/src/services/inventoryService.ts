import Inventory from "../models/inventory";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes } from "../types/inventory";
import ErrorHandler from "../utils/errorHandler";

class InventoryService {
    private inventoryRepository: IInventoryRepository;

    constructor(inventoryRepository: IInventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async findByProduct(productId: string): Promise<Inventory[]> {
        try {
            return await this.inventoryRepository.findByProduct(productId);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding inventories by product', 500);
        }
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory[]> {
        try {
            return await this.inventoryRepository.findProductByBatch(productId, batchNo);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding inventories by batch number', 500);
        }
    }

    async getAllInventories(): Promise<Inventory[]> {
        try {
            return await this.inventoryRepository.getAllInventories();
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error retrieving all inventories', 500);
        }
    }

    async addInventory(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        try {
            return await this.inventoryRepository.create(inventoryData);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error creating inventory', 500);
        }
    }

    async updateInventory(productId: string, batchNo: string, inventoryData: Partial<InventoryAttributes>): Promise<Inventory | null> {
        try {
            const existingInventory = await this.inventoryRepository.findProductByBatch(productId, batchNo);
            if (!existingInventory) {
                throw new ErrorHandler('Inventory not found', 404);
            }
            const updatedInventory = await this.inventoryRepository.update(existingInventory[0].id, inventoryData);
            return updatedInventory;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error updating inventory', 500);
        }
    }

    async deleteInventory(id: string): Promise<void> {
        try {
            await this.inventoryRepository.delete(id);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error deleting inventory', 500);
        }
    }
}

export default InventoryService;
