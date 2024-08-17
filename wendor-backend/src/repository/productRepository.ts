import { IProductRepository, ProductsResponse } from "../types/product";
import Product from "../models/product";
import { ProductCreationAttributes } from "../types/product";
import Company from "../models/company";
import { sequelize } from "../config/database";
import { ApiError } from "../middlewares/ApiError";

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

    async findByNameAndCompany(product: string, companyId: string): Promise<Product | null> {
        return await Product.findOne({
            where: {
                name: product,
                companyId: companyId
            }
        });
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
                'barcodeNo',
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
        const existingProduct = await this.findByNameAndCompany(product.name, product.companyId);
        if (existingProduct) {
            throw new ApiError(400, 'Product already exists');
        }
        const checkBar = await Product.findOne({ where: { barcodeNo: product.barcodeNo } });
        if (checkBar) {
            throw new ApiError(400, `${product.name}'s barcode associated with another product`);
        }
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
            throw new ApiError(404, 'Product not found');
        }
    }

    async findByBarcode(barcodeNo: string): Promise<Product | null> {
        return await Product.findOne({ where: { barcodeNo } });
    }
}

export default ProductRepository;
