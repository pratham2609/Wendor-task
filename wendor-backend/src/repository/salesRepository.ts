import { ISalesRepository, ISaleProductRepository, SaleCreationAttributes, SaleProductCreationAttributes, SalesResponse } from '../types/sale';
import { Sale, SaleProduct } from '../models/sale';
import Product from '../models/product';
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
                    as: 'saleProducts',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['name', 'price']
                        }
                    ]
                }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        const sales = rows.map(sale => {
            return {
                id: sale.id,
                totalPrice: sale.totalPrice,
                createdAt: sale.createdAt,
                // @ts-ignore
                products: sale.saleProducts.map(saleProduct => ({
                    name: saleProduct.product.name,
                    quantity: saleProduct.quantity,
                    price: saleProduct.product.price
                }))
            };
        });
        return { totalCount: sales.length, sales: sales };
    }

    async getUserSales(userId: string, page?: number, pageSize?: number): Promise<SalesResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;
        const { rows } = await Sale.findAndCountAll({
            where: { userId },
            attributes: [
                'id',
                'totalPrice',
                'createdAt',
            ],
            include: [
                {
                    model: SaleProduct,
                    as: 'saleProducts',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['name', 'price', 'display_image_url']
                        }
                    ]
                }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        const sales = rows.map(sale => ({
            id: sale.id,
            totalPrice: sale.totalPrice,
            createdAt: sale.createdAt,
            // @ts-ignore
            products: sale.saleProducts.map(saleProduct => ({
                name: saleProduct.product.name,
                quantity: saleProduct.quantity,
                price: saleProduct.product.price,
                display_image_url: saleProduct.product.display_image_url
            }))
        }));
        return { totalCount: sales.length, sales: sales };
    }

    async getTotalSales(): Promise<number> {
        return await Sale.count();
    }

    async getTotalRevenue(): Promise<number> {
        const totalRevenue = await Sale.sum('totalPrice');
        return totalRevenue || 0;
    }

}

class SaleProductRepository implements ISaleProductRepository {
    async create(saleProductData: SaleProductCreationAttributes, transaction?: Transaction): Promise<SaleProduct> {
        return await SaleProduct.create(saleProductData, { transaction });
    }
}

export { SalesRepository, SaleProductRepository };
