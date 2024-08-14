import Inventory from "../models/inventory";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes, InventoryResponse } from "../types/inventory";
import ErrorHandler from "../utils/errorHandler";

class InventoryService {
    private inventoryRepository: IInventoryRepository;

    constructor(inventoryRepository: IInventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async findByProductId(productId: string): Promise<Inventory[]> {
        try {
            return await this.inventoryRepository.findByProductId(productId);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding inventories by product', 500);
        }
    }

    async getProductDetails(productId: string): Promise<InventoryResponse> {
        try {
            return await this.inventoryRepository.getProductDetails(productId);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding product details in inventory', 500);
        }
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null> {
        try {
            return await this.inventoryRepository.findProductByBatch(productId, batchNo);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding inventories by batch number', 500);
        }
    }

    async getAllInventories(): Promise<InventoryResponse[]> {
        try {
            return await this.inventoryRepository.getAllInventories();
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error retrieving all inventories', 500);
        }
    }

    async addInventory(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        try {
            // const check if the same batch is there then update the quantity 
            const existingInventory = await this.inventoryRepository.findProductByBatch(inventoryData.productId, inventoryData.batchNo);
            console.log(existingInventory)
            if (existingInventory) {
                const quantity = existingInventory.quantity + inventoryData.quantity;
                await this.inventoryRepository.update(existingInventory.id, { quantity });
                return existingInventory;
            }
            return await this.inventoryRepository.create(inventoryData);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error creating inventory', 500);
        }
    }

    async updateInventory(productId: string, batchNo: string, inventoryData: Partial<InventoryAttributes>): Promise<void> {
        try {
            const existingInventory = await this.inventoryRepository.findProductByBatch(productId, batchNo);
            if (!existingInventory) {
                throw new ErrorHandler('Inventory not found', 404);
            }
            await this.inventoryRepository.update(existingInventory.id, inventoryData);
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
