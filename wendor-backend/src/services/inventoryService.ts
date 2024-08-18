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

    async getAllInventories(page?: number, pageSize?: number, category?: string, company?: string): Promise<InventoryResponse> {
        return await this.inventoryRepository.getAllInventories(page, pageSize, category, company);
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

    async createBulkInventory(inventoryData: InventoryCreationAttributes[]): Promise<boolean> {
        try {
            await this.inventoryRepository.createBulkInventory(inventoryData);
            return true;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error creating inventory');
        }
    }

    async updateInventory(inventoryId: string, inventoryData: Partial<InventoryAttributes>): Promise<void> {
        try {
            const existingInventory = await this.inventoryRepository.findByInventoryId(inventoryId);
            if (!existingInventory) {
                throw new ApiError(404, 'Inventory not found');
            }
            await this.inventoryRepository.update(inventoryId, inventoryData);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error updating inventory');
        }
    }

    async deleteInventoryBatch(inventoryId: string): Promise<void> {
        try {
            await this.inventoryRepository.deleteProductBatchInventory(inventoryId);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error deleting inventory');
        }
    }

    async deleteProductInventory(productId: string): Promise<void> {
        try {
            await this.inventoryRepository.deleteAllProductInventory(productId);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error deleting inventory');
        }
    }

}

export default InventoryService;
