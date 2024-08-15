import { ISalesRepository, ISaleProductRepository, SaleCreationAttributes, SaleProductCreationAttributes, SalesResponse } from '../types/sale';
import { Sale, SaleProduct } from '../models/sale';
import Product from '../models/product';
import { Transaction } from 'sequelize';
import { sequelize } from '../config/database';

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

    async getAllSales(page?: number, pageSize?: number): Promise<SalesResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;

        const { count, rows } = await Sale.findAndCountAll({
            attributes: [
                'id',
                'totalPrice',
                'createdAt',
            ],
            include: [
                {
                    model: SaleProduct,
                    as: 'products',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['name', 'price'],
                        },
                    ],
                },
            ],
            limit,
            offset,
        });
        return { totalCount: count, sales: rows };
    }

    async getUserSales(userId: string, page?: number, pageSize?: number): Promise<SalesResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;

        const { count, rows } = await Sale.findAndCountAll({
            where: { userId },
            include: [
                {
                    model: SaleProduct,
                    as: 'products',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                        },
                    ],
                },
            ],
            limit,
            offset,
        });

        return { totalCount: count, sales: rows };
    }

}

class SaleProductRepository implements ISaleProductRepository {
    async create(saleProductData: SaleProductCreationAttributes, transaction?: Transaction): Promise<SaleProduct> {
        return await SaleProduct.create(saleProductData, { transaction });
    }
}

export { SalesRepository, SaleProductRepository };
