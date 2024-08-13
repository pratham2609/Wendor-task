import { Optional } from "sequelize";
import Product from "../models/product";

export enum CategoryEnum {
    SNACKS = 'SNACKS',
    BEVERAGES = 'BEVERAGES',
    HEALTHY_OPTIONS = 'HEALTHY_OPTIONS',
    MEALS_AND_SANDWICHES = 'MEALS_AND_SANDWICHES',
    DAIRY_PRODUCTS = 'DAIRY_PRODUCTS',
    BAKED_GOODS = 'BAKED_GOODS',
    FROZEN_TREATS = 'FROZEN_TREATS',
    NON_FOOD_ITEMS = 'NON_FOOD_ITEMS',
}

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;
    findByCategory(category: string): Promise<Product[]>;
    findByCompany(companyName: string): Promise<Product[]>;
    getAllProducts(): Promise<Product[]>;
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
    createdAt: Date;
    companyId: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id" | "createdAt"> { }