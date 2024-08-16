import { Optional, Transaction } from "sequelize";
import { Sale, SaleProduct } from "../models/sale";


export interface ISalesRepository {
    findById(id: string): Promise<Sale | null>;
    create(saleData: SaleCreationAttributes, transaction?: Transaction): Promise<Sale>;
    getAllSales(page?: number, pageSize?: number): Promise<SalesResponse>;
    getUserSales(userId: string, page?: number, pageSize?: number): Promise<SalesResponse>;
}

export interface ISaleProductRepository {
    create(saleProductData: SaleProductCreationAttributes, transaction?: Transaction): Promise<SaleProduct>;
}

export interface SaleAttributes {
    id: string;
    userId: string;
    totalPrice: number;
}

export interface SaleCreationAttributes extends Optional<SaleAttributes, 'id' | 'totalPrice'> { }

export interface SaleProductAttributes {
    id: string;
    saleId: string;
    productId: string;
    quantity: number;
}
export interface SaleProductCreationAttributes extends Optional<SaleProductAttributes, 'id'> { }


export interface SaleProductRequest {
    productId: string;
    quantity: number;
}

export interface SingleSaleResponse {
    id: string;
    totalPrice: number;
    createdAt: Date;
    products: SaleProductRequest[];
}

export interface SalesResponse {
    sales: SingleSaleResponse[];
    totalCount: number;
}