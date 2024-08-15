import Product from "../models/product";
import CompanyRepository from "../repository/companyRepository";
import { ICompanyRepository } from "../types/company";
import { IProductRepository, ProductCreationAttributes, ProductsResponse } from "../types/product";
import ErrorHandler from "../utils/errorHandler.js";

interface ProductCreationRequest extends ProductCreationAttributes {
    companyName: string;
}

export class ProductService {
    private productRepository: IProductRepository;
    private readonly companyRepository: ICompanyRepository;;
    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
        this.companyRepository = new CompanyRepository();
    }

    async findById(id: string): Promise<Product | null> {
        try {
            const product = await this.productRepository.findById(id);
            if (!product) {
                throw new ErrorHandler('Product not found', 400);
            }
            return product;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding product by ID', 500);
        }
    }

    async findByCategory(category: string, page?:number, pageSize?: number): Promise<ProductsResponse> {
        try {
            return await this.productRepository.findByCategory(category, page, pageSize);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding products by category', 500);
        }
    }

    async findByCompany(companyName: string, page?:number, pageSize?: number): Promise<ProductsResponse> {
        try {
            return await this.productRepository.findByCompany(companyName, page, pageSize);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding products by company name', 500);
        }
    }

    async getAllProducts(page?:number, pageSize?: number): Promise<ProductsResponse> {
        try {
            return await this.productRepository.getAllProducts(page, pageSize);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error retrieving products', 500);
        }
    }

    async createProduct(productData: ProductCreationRequest): Promise<Product> {
        try {
            let company = await this.companyRepository.findByName(productData.companyName);
            if (!company) {
                try {
                    company = await this.companyRepository.create({ company_name: productData.companyName })
                } catch (error) {
                    throw new ErrorHandler((error as Error).message || 'Error creating company', 500);
                }
            }
            productData.companyId = company.id;
            return await this.productRepository.create(productData);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error creating product', 500);
        }
    }

    async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
        try {
            const updatedProduct = await this.productRepository.update(id, productData);
            if (!updatedProduct) {
                throw new ErrorHandler('Product not found', 400);
            }
            return updatedProduct;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error updating product', 500);
        }
    }

    async deleteProduct(id: string): Promise<void> {
        try {
            await this.productRepository.delete(id);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error deleting product', 500);
        }
    }
}
