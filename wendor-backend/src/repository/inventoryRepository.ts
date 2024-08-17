import { sequelize } from "../config/database";
import Inventory from "../models/inventory";
import Product from "../models/product";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes, InventoryResponse } from "../types/inventory";
import Company from "../models/company";
import { ApiError } from "../middlewares/ApiError";

class InventoryRepository implements IInventoryRepository {

    async findByInventoryId(inventoryId: string): Promise<Inventory> {
        const inventory = await Inventory.findByPk(inventoryId);
        if (!inventory) {
            throw new ApiError(404, 'Inventory not found');
        }
        return inventory;
    }

    async findByProductId(productId: string): Promise<Inventory[]> {
        const inventory = await Inventory.findAll({
            where: { productId },
            attributes: [
                'id',
                'productId',
                'quantity',
                'batchNo',
                [sequelize.col('product.name'), 'productName'],
                [sequelize.col('product.price'), 'productPrice'],
                [sequelize.col('product.display_image_url'), 'display_image_url'],
                [sequelize.col('product.company.company_name'), 'companyName'],
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        {
                            model: Company,
                            attributes: [],
                            as: 'company',
                        },
                    ],
                }
            ],
            order: [['quantity', 'DESC']]
        });
        return inventory;
    }

    async getProductBatchesForTx(query: object): Promise<Inventory[]> {
        try {
            return await Inventory.findAll(query);
        } catch (error) {
            throw new Error('Error finding inventory items: ' + (error as Error).message);
        }
    }

    async findProductByBatch(productId: string, batchNo: string): Promise<Inventory | null> {
        return await Inventory.findOne({
            where: { productId, batchNo },
            attributes: [
                'id',
                'productId',
                'quantity',
                'batchNo',
                [sequelize.col('product.name'), 'productName'],
                [sequelize.col('product.price'), 'productPrice'],
                [sequelize.col('product.company.company_name'), 'companyName'],
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        {
                            model: Company,
                            attributes: [],
                            as: 'company',
                        },
                    ],
                }
            ],
        });
    }

    async getAllInventories(page?: number, pageSize?: number): Promise<InventoryResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;
        const inventory = await Inventory.findAll({
            attributes: [
                'productId',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
                [sequelize.col('product.name'), 'productName'],
                [sequelize.col('product.price'), 'productPrice'],
                [sequelize.col('product.company.company_name'), 'companyName'],
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        {
                            model: Company,
                            attributes: [],
                            as: 'company',
                        },
                    ],
                }
            ],
            group: ['productId', 'product.id', 'product.name', 'product.price', 'product.company.id', 'product.company.company_name'],
            having: sequelize.literal('SUM(quantity) > 0'),
            limit,
            offset,
        });
        const count = await Inventory.count({
            distinct: true,
            col: 'productId',
        });
        return {
            totalCount: inventory.length == 0 ? 0 : count,
            inventory
        };
    }

    async getProductDetails(productId: string): Promise<any> {
        const inventories = await Inventory.findAll({
            where: { productId },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
                [sequelize.col('product.name'), 'productName'],
                [sequelize.col('product.price'), 'productPrice'],
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                }
            ],
            group: ['productId', 'product.id', 'product.name', 'product.price'],
        });
        return inventories[0].dataValues;
    }

    async getProductInInventory(productId: string): Promise<Inventory | null> {
        const inventories = await Inventory.findOne({
            where: { productId },
            attributes: [
                'productId',
                [sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity'],
                [sequelize.col('product.name'), 'productName'],
                [sequelize.col('product.price'), 'productPrice'],
                [sequelize.col('product.display_image_url'), 'display_image_url'],
                [sequelize.col('product.company.company_name'), 'companyName'],
            ],
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: [],
                    include: [
                        {
                            model: Company,
                            attributes: [],
                            as: 'company',
                        },
                    ],
                }
            ],
            group: ['productId', 'product.id', 'product.name', 'product.price', 'product.company.id', 'product.company.company_name'],
        });
        return inventories;
    }

    async getProductQuantity(productId: string): Promise<number> {
        const inventories = await Inventory.findAll({
            where: { productId },
            attributes: [
                [sequelize.fn('SUM', sequelize.col('quantity')), 'quantity'],
            ],
            group: ['productId'],
        });
        return inventories.length > 0 ? inventories[0].quantity : 0;
    }

    async create(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        return await Inventory.create(inventoryData);
    }

    async update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<void> {
        const existingInventory = await Inventory.findByPk(id);
        if (!existingInventory) {
            throw new ApiError(404, 'Inventory not found');
        }
        await existingInventory.update(inventoryData);
    }

    async deleteAllProductInventory(id: string): Promise<void> {
        await Inventory.destroy({ where: { productId: id } });
    }

    async deleteProductBatchInventory(inventoryId: string): Promise<void> {
        const inventory = await Inventory.findByPk(inventoryId);
        if (!inventory) {
            throw new ApiError(404, 'Inventory not found');
        }
        await inventory.destroy();
    }
}

export default InventoryRepository;
