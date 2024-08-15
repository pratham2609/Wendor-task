import { IProductRepository, ProductsResponse } from "../types/product";
import Product from "../models/product";
import { ProductCreationAttributes } from "../types/product";
import Company from "../models/company";
import { sequelize } from "../config/database";

class ProductRepository implements IProductRepository {

    async findById(id: string): Promise<Product | null> {
        return await Product.findByPk(id);
    }

    async findByCategory(category: string, page?: number, pageSize?: number): Promise<ProductsResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;

        const { count, rows } = await Product.findAndCountAll({
            where: { category },
            limit,
            offset,
        });

        return { totalCount: count, products: rows };
    }

    async findByCompany(companyId: string, page?: number, pageSize?: number): Promise<ProductsResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;

        const { count, rows } = await Product.findAndCountAll({
            where: { companyId },
            limit,
            offset,
        });

        return { totalCount: count, products: rows };
    }

    async getAllProducts(page?: number, pageSize?: number): Promise<ProductsResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;

        const { count, rows } = await Product.findAndCountAll({
            attributes: [
                'id',
                'name',
                'price',
                'category',
                'display_image_url',
                'createdAt',
                [sequelize.col('company.company_name'), 'companyName'],
            ],
            limit,
            offset,
            include: [
                {
                    model: Company,
                    as: 'company',
                    attributes: [],
                }
            ],
        });

        return { totalCount: count, products: rows };
    }

    async create(product: ProductCreationAttributes): Promise<Product> {
        return await Product.create(product);
    }

    async update(id: string, product: Partial<Product>): Promise<Product> {
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        return await existingProduct.update(product);
    }

    async delete(id: string): Promise<void> {
        const product = await Product.findByPk(id);
        if (product) {
            await product.destroy();
        } else {
            throw new Error('Product not found');
        }
    }
}

export default ProductRepository;
