import { ApiError } from "../middlewares/ApiError";
import Inventory from "../models/inventory";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes, InventoryModified, InventoryResponse } from "../types/inventory";

class InventoryService {
    private inventoryRepository: IInventoryRepository;

    constructor(inventoryRepository: IInventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    async findByProductId(productId: string): Promise<Inventory[]> {
        try {
            const inventory = await this.inventoryRepository.findByProductId(productId);
            if (!inventory) {
                throw new ApiError(404, 'Product Inventory not found');
            }
            return inventory;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error finding inventory by product ID');
        }
    }

    async getProductDetails(productId: string): Promise<InventoryModified> {
        try {
            return await this.inventoryRepository.getProductDetails(productId);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching product details');
        }
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null> {
        try {
            const inventory = await this.inventoryRepository.findProductByBatch(productId, batchNo);
            if (!inventory) {
                throw new ApiError(404, 'Product Inventory not found');
            }
            return inventory;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error finding product by batch');
        }
    }

    async getAllInventories(page?: number, pageSize?: number, category?: string, company?: string): Promise<InventoryResponse> {
        try {
            return await this.inventoryRepository.getAllInventories(page, pageSize, category, company);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching all inventories');
        }
    }

    async getSingleProductQuantity(productId: string): Promise<number> {
        try {
            return await this.inventoryRepository.getProductQuantity(productId);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching product quantity');
        }
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
            throw new ApiError(500, (error as Error).message || 'Error adding inventory');
        }
    }

    async createBulkInventory(inventoryData: InventoryAttributes[]): Promise<boolean> {
        try {
            // Validation check
            inventoryData.forEach(item => {
                if (!item.productId || !item.batchNo || item.quantity == null) {
                    // @ts-ignore
                    throw new ApiError(400, `Missing required fields for ${item.name}, batchNo: ${item.batchNo || 'N/A'}, quantity: ${item.quantity == null ? 'N/A' : item.quantity}`);
                }
            });

            await this.inventoryRepository.createBulkInventory(inventoryData);
            return true;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error creating bulk inventory');
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
            throw new ApiError(500, (error as Error).message || 'Error deleting inventory batch');
        }
    }

    async deleteProductInventory(productId: string): Promise<void> {
        try {
            await this.inventoryRepository.deleteAllProductInventory(productId);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error deleting product inventory');
        }
    }

    async searchProductsInInventory(name: string): Promise<any[]> {
        try {
            return await this.inventoryRepository.searchProducts(name);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error searching products');
        }
    }
}

export default InventoryService;
