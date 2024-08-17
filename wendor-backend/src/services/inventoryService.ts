import { ApiError } from "../middlewares/ApiError";
import Inventory from "../models/inventory";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes, InventoryModified, InventoryResponse } from "../types/inventory";

class InventoryService {
    private inventoryRepository: IInventoryRepository;

    constructor(inventoryRepository: IInventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async findByProductId(productId: string): Promise<Inventory[]> {
        const inventory = await this.inventoryRepository.findByProductId(productId);
        if (!inventory) {
            throw new ApiError(404, 'Product Inventory not found');
        }
        return inventory;
    }

    async getProductDetails(productId: string): Promise<InventoryModified> {
        return this.inventoryRepository.getProductDetails(productId)
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null> {
        const inventory = await this.inventoryRepository.findProductByBatch(productId, batchNo);
        if (!inventory) {
            throw new ApiError(404, 'Product Inventory not found');
        }
        return inventory;
    }

    async getAllInventories(): Promise<InventoryResponse> {
        return await this.inventoryRepository.getAllInventories();
    }

    async getSingleProductQuantity(productId: string): Promise<number> {
        return await this.inventoryRepository.getProductQuantity(productId);
    }

    async addInventory(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        try {
            const existingInventory = await this.inventoryRepository.findProductByBatch(inventoryData.productId, inventoryData.batchNo);
            if (existingInventory) {
                const quantity = existingInventory.quantity + inventoryData.quantity;
                await this.inventoryRepository.update(existingInventory.id, { quantity });
                return existingInventory;
            }
            return await this.inventoryRepository.create(inventoryData);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error creating inventory');
        }
    }

    async updateInventory(productId: string, batchNo: string, inventoryData: Partial<InventoryAttributes>): Promise<void> {
        try {
            const existingInventory = await this.inventoryRepository.findProductByBatch(productId, batchNo);
            if (!existingInventory) {
                throw new ApiError(404, 'Inventory not found');
            }
            await this.inventoryRepository.update(existingInventory.id, inventoryData);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error updating inventory');
        }
    }

    async deleteInventory(id: string): Promise<void> {
        try {
            await this.inventoryRepository.delete(id);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error deleting inventory');
        }
    }
}

export default InventoryService;
