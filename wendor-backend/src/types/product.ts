import { Optional } from "sequelize";
import Product from "../models/product";

export enum CategoryEnum {
    SNACKS = 'Snacks',
    BEVERAGES = 'Beverages',
    HEALTHY_OPTIONS = 'Healthy',
    SANDWICHES = 'Sandiwches',
    DAIRY = 'Dairy',
    BAKED = 'Baked',
    FROZEN = 'Frozen',
    Medicines = 'Medicines'
};

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;
    findByCategory(category: string, page?:number, pageSize?: number): Promise<ProductsResponse>;
    findByCompany(companyId: string, page?:number, pageSize?: number): Promise<ProductsResponse>;
    getAllProducts(page?:number, pageSize?: number): Promise<ProductsResponse>;
    create(product: ProductCreationAttributes): Promise<Product>;
    update(id: string, product: Partial<Product>): Promise<Product>;
    delete(id: string): Promise<void>;
}

export interface ProductAttributes {
    id: string;
    name: string;
    price: number;
    display_image_url: string;
    category: CategoryEnum;
    companyId: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> { }

export interface ProductsResponse {
    products: Product[];
    totalCount: number;
}