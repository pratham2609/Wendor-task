import { sequelize } from "../config/database";
import Inventory from "../models/inventory";
import Product from "../models/product";
import { IInventoryRepository, InventoryAttributes, InventoryCreationAttributes, InventoryModified, InventoryResponse } from "../types/inventory";
import ErrorHandler from "../utils/errorHandler";
import Company from "../models/company";

class InventoryRepository implements IInventoryRepository {

    async findByProductId(productId: string): Promise<Inventory[]> {
        return await Inventory.findAll({
            where: { productId },
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

    async create(inventoryData: InventoryCreationAttributes): Promise<Inventory> {
        return await Inventory.create(inventoryData);
    }

    async update(id: string, inventoryData: Partial<InventoryAttributes>): Promise<void> {
        const existingInventory = await Inventory.findByPk(id);
        if (!existingInventory) {
            throw new ErrorHandler('Inventory not found', 401);
        }
        await existingInventory.update(inventoryData);
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
