import { ISalesRepository, ISaleProductRepository, SaleCreationAttributes, SaleProductCreationAttributes } from '../types/sale';
import { Sale, SaleProduct } from '../models/sale';
import Product from '../models/product';
import Inventory from '../models/inventory';
import { Transaction } from 'sequelize';

class SalesRepository implements ISalesRepository {
    async findById(id: string): Promise<Sale | null> {
        return await Sale.findByPk(id);
    }

    async create(saleData: SaleCreationAttributes, transaction?: Transaction): Promise<Sale> {
        try {
            return await Sale.create(saleData, { transaction });
        } catch (error) {
            throw new Error('Error creating sale: ' + (error as Error).message);
        }
    }

    getProductWiseSales(productId: string): Promise<Sale[]> {
        return Sale.findAll({
            include: [
                {
                    model: SaleProduct,
                    as: 'saleProducts',
                    where: { productId },
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                        {
                            model: Inventory,
                            as: 'inventory',
                        }
                    ],
                },
            ],
        });
    }

    async getAllSales(): Promise<Sale[]> {
        return await Sale.findAll({
            include: [
                {
                    model: SaleProduct,
                    as: 'saleProducts',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                        {
                            model: Inventory,
                            as: 'inventory',
                        }
                    ],
                },
            ],
        });
    }

    async getUserSales(userId: string): Promise<Sale[]> {
        return await Sale.findAll({
            where: { userId },
            include: [
                {
                    model: SaleProduct,
                    as: 'saleProducts',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                    ],
                },
            ],
        });
    }
}

class SaleProductRepository implements ISaleProductRepository {
    async create(saleProductData: SaleProductCreationAttributes, transaction?: Transaction): Promise<SaleProduct> {
        return await SaleProduct.create(saleProductData, { transaction });
    }
}

export { SalesRepository, SaleProductRepository };
