import { IProductRepository, ProductCompanies, ProductsResponse } from "../types/product";
import Product from "../models/product";
import { ProductCreationAttributes } from "../types/product";
import Company from "../models/company";
import { sequelize } from "../config/database";
import { ApiError } from "../middlewares/ApiError";
import { Op } from "sequelize";

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

    async getAllProducts(page?: number, pageSize?: number, category?: string, company?: string): Promise<ProductsResponse> {
        try {
            const offset = page && pageSize ? (page - 1) * pageSize : undefined;
            const limit = pageSize;
            const { count, rows } = await Product.findAndCountAll({
                where: {
                    ...(category && { category }),
                    ...(company && { companyId: company }),
                },
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
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching products');
        }
    }

    async getAllProductsCompanies(): Promise<ProductCompanies[]> {
        try {
            const products = await Product.findAll({
                attributes: [
                    'id',
                    'name',
                    [sequelize.col('company.company_name'), 'company_name'],
                ],
                include: [
                    {
                        model: Company,
                        as: 'company',
                        attributes: []
                    }
                ],
            });
            // @ts-ignore
            return products;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching products');
        }
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

    async bulkCreate(productDataArray: ProductCreationAttributes[]): Promise<Product[]> {
        const namesAndCompanyIds = productDataArray.map(product => ({
            name: product.name,
            companyId: product.companyId
        }));

        const barcodes = productDataArray.map(product => product.barcodeNo);

        const existingProducts = await Product.findAll({
            where: {
                [Op.or]: namesAndCompanyIds.map(item => ({
                    name: item.name,
                    companyId: item.companyId
                })),
            }
        });

        // Find products with the same barcode
        const existingBarcodes = await Product.findAll({
            where: {
                barcodeNo: {
                    [Op.in]: barcodes
                }
            }
        });

        if (existingProducts.length > 0) {
            throw new ApiError(400, 'One or more products already exist with the same name and company ID');
        }

        if (existingBarcodes.length > 0) {
            const conflictingBarcodes = existingBarcodes.map(product => product.barcodeNo).join(', ');
            throw new ApiError(400, `Barcodes ${conflictingBarcodes} are already associated with other products`);
        }

        return await Product.bulkCreate(productDataArray);
    }


    async update(id: string, product: Partial<Product>): Promise<Product> {
        const existingProduct = await Product.findByPk(id);
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        return await existingProduct.update(product);
    }

    async delete(id: string): Promise<void> {
        try {
            const product = await Product.findByPk(id);
            if (!product) throw new ApiError(404, 'Product not found');
            await product.destroy();
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error deleting product');
        }
    }

    async findByBarcode(barcodeNo: string): Promise<Product | null> {
        return await Product.findOne({ where: { barcodeNo } });
    }

    async getTotalProducts(): Promise<number> {
        return await Product.count();
    }
}

export default ProductRepository;
