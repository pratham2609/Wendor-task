import { IProductRepository } from "../types/product";
import Product from "../models/product";
import { ProductCreationAttributes } from "../types/product";

class ProductRepository implements IProductRepository {

    async findById(id: string): Promise<Product | null> {
        return await Product.findByPk(id);
    }

    async findByCategory(category: string): Promise<Product[]> {
        return await Product.findAll({ where: { category } });
    }

    async findByCompany(companyId: string): Promise<Product[]> {
        return await Product.findAll({ where: { companyId } });
    }

    async getAllProducts(): Promise<Product[]> {
        return await Product.findAll();
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
