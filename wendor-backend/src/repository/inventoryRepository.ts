import Inventory from "../models/inventory";
import Product from "../models/product";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes } from "../types/inventory";
import ErrorHandler from "../utils/errorHandler";

class InventoryRepository implements IInventoryRepository {

    async findById(id: string): Promise<Inventory | null> {
        return await Inventory.findByPk(id);
    }

    async findByProduct(productId: string): Promise<Inventory[]> {
        return await Inventory.findAll({
            where: { productId },
            include: [{
                model: Product,
                attributes: ['name', 'price'],
            }]
        });
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory[]> {
        return await Inventory.findAll({
            where: { productId, batchNo },
            include: [{
                model: Product,
                attributes: ['name', 'price'],
            }]
        });
    }

    async getAllInventories(): Promise<Inventory[]> {
        return await Inventory.findAll({
            include: [{
                model: Product,
                attributes: ['name', 'price'],
            }]
        });
    }

    async create(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        return await Inventory.create(inventoryData);
    }

    async update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<Inventory | null> {
        const existingInventory = await Inventory.findByPk(id);
        if (!existingInventory) {
            throw new ErrorHandler('Inventory not found', 401);
        }
        return await existingInventory.update(inventoryData);
    }

    async delete(id: string): Promise<void> {
        const inventory = await Inventory.findByPk(id);
        if (inventory) {
            await inventory.destroy();
        } else {
            throw new ErrorHandler('Inventory not found', 401);
        }
    }
}

export default InventoryRepository;
