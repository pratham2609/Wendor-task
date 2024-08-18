import { ApiError } from "../middlewares/ApiError";
import Product from "../models/product";
import CompanyRepository from "../repository/companyRepository";
import { ICompanyRepository } from "../types/company";
import { IProductRepository, ProductCompanies, ProductCreationAttributes, ProductsResponse } from "../types/product";

interface ProductCreationRequest extends ProductCreationAttributes {
    company_name: string;
}

export class ProductService {
    private productRepository: IProductRepository;
    private readonly companyRepository: ICompanyRepository;

    constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
        this.companyRepository = new CompanyRepository();
    }

    async findById(id: string): Promise<Product | null> {
        try {
            const product = await this.productRepository.findById(id);
            if (!product) {
                throw new ApiError(404, 'Product not found');
            }
            return product;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error finding product by ID');
        }
    }

    async findByCategory(category: string, page?: number, pageSize?: number): Promise<ProductsResponse> {
        return await this.productRepository.findByCategory(category, page, pageSize);
    }

    async findByCompany(companyName: string, page?: number, pageSize?: number): Promise<ProductsResponse> {
        return await this.productRepository.findByCompany(companyName, page, pageSize);
    }

    async getAllProducts(page?: number, pageSize?: number, category?: string, company?: string): Promise<ProductsResponse> {
        return await this.productRepository.getAllProducts(page, pageSize, category, company);
    }

    async createProduct(productData: ProductCreationRequest): Promise<Product> {
        try {
            if (!productData.company_name) {
                throw new ApiError(400, 'Company name is required');
            }
            let company = await this.companyRepository.findByName(productData.company_name);
            if (!company) {
                try {
                    company = await this.companyRepository.create(productData.company_name);
                } catch (error) {
                    throw new ApiError(500, (error as Error).message || 'Error creating company');
                }
            }
            productData.companyId = company.id;
            if (!productData.name || !productData.barcodeNo || !productData.category ||
                !productData.companyId || !productData.display_image_url
                || !productData.price) {
                throw new ApiError(400, 'All fields are required');
            }
            return await this.productRepository.create(productData);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error creating product');
        }
    }

    async bulkCreateProducts(productDataArray: ProductCreationRequest[]): Promise<Product[]> {
        try {
            const productsToCreate: ProductCreationAttributes[] = [];
            for (const productData of productDataArray) {
                if (!productData.company_name) {
                    throw new ApiError(400, 'Company name is required for' + productData.name);
                }
                let company = await this.companyRepository.findByName(productData.company_name);
                if (!company) {
                    try {
                        company = await this.companyRepository.create(productData.company_name);
                    } catch (error) {
                        throw new ApiError(500, (error as Error).message || 'Error creating company');
                    }
                }
                productData.companyId = company.id;
                if (!productData.name || !productData.barcodeNo || !productData.category || !productData.companyId
                    || !productData.price) {
                    throw new ApiError(400, 'All fields are required');
                }
                productsToCreate.push(productData);
            }
            return await this.productRepository.bulkCreate(productsToCreate);
        } catch (error) {
            console.log(error)
            throw new ApiError(500, (error as Error).message || 'Error creating products');
        }
    }

    async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
        try {
            const updatedProduct = await this.productRepository.update(id, productData);
            if (!updatedProduct) {
                throw new ApiError(404, 'Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error updating product');
        }
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.delete(id);
    }

    async findByBarcode(barcodeNo: string): Promise<Product> {
        const product = await this.productRepository.findByBarcode(barcodeNo);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }
        return product;
    }
    async getTotalProducts(): Promise<number> {
        return await this.productRepository.getTotalProducts();
    }

    async getAllProductsCompanies(): Promise<ProductCompanies[]> {
        return await this.productRepository.getAllProductsCompanies();
    }
}

export default ProductService;
