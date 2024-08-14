import { ISaleProductRepository, ISalesRepository, SaleProductCreationAttributes, SaleProductRequest } from '../types/sale';
import { Sale, SaleProduct } from '../models/sale';
import ErrorHandler from '../utils/errorHandler';
import { IInventoryRepository } from '../types/inventory';
import InventoryRepository from '../repository/inventoryRepository';
import { sequelize } from '../config/database';
import InventoryService from './inventoryService';
import { SaleProductRepository } from '../repository/salesRepository';

class SalesService {
    private salesRepository: ISalesRepository;
    private saleProductRepository: ISaleProductRepository;
    private inventoryRepository: IInventoryRepository;
    inventoryService: InventoryService

    constructor(salesRepository: ISalesRepository) {
        this.salesRepository = salesRepository;
        this.saleProductRepository = new SaleProductRepository();
        this.inventoryRepository = new InventoryRepository();
        this.inventoryService = new InventoryService(this.inventoryRepository);
    }

    async findSaleById(id: string): Promise<Sale | null> {
        try {
            return await this.salesRepository.findById(id);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error finding sale by ID', 500);
        }
    }

    async createSale(userId: string, saleProducts: SaleProductRequest[]): Promise<Sale> {
        const transaction = await sequelize.transaction();
    
        try {
            // Step 1: Calculate total price and check if the total available quantity is sufficient
            let totalPrice = 0;
            const productQuantities: { [productId: string]: number } = {};
    
            for (const saleProduct of saleProducts) {
                const productDetails = await this.inventoryService.getProductDetails(saleProduct.productId);
                if (!productDetails) {
                    throw new ErrorHandler(`Product details not found for product ID ${saleProduct.productId}`, 404);
                }
                if (productDetails.totalQuantity < saleProduct.quantity) {
                    throw new ErrorHandler(
                        `Insufficient inventory available for product ${productDetails.productName}: ${productDetails.totalQuantity}pcs`,
                        400
                    );
                }
                // Ensure product price is valid
                if (productDetails.productPrice == null) {
                    throw new ErrorHandler(`Invalid price for product ${productDetails.productName}`, 400);
                }
    
                totalPrice += productDetails.productPrice * saleProduct.quantity;
                productQuantities[saleProduct.productId] = (productQuantities[saleProduct.productId] || 0) + saleProduct.quantity;
            }
    
            // Check if totalPrice was calculated
            if (totalPrice <= 0) {
                throw new ErrorHandler('Total price calculation error.', 500);
            }
    
            // Step 2: Create the sale record
            const sale = await this.salesRepository.create({
                userId,
                totalPrice,
            }, transaction);
    
            // Step 3: Deduct inventory and create sale products
            for (const [productId, totalQuantity] of Object.entries(productQuantities)) {
                let remainingQuantity = totalQuantity;
    
                // Fetch all batches for the product, ordered by batch number
                const inventoryBatches = await this.inventoryRepository.getProductBatchesForTx({
                    where: { productId },
                    order: [['batchNo', 'ASC']],
                    lock: transaction.LOCK.UPDATE, // Lock the rows to prevent concurrent modifications
                    transaction,
                });
    
                for (const inventoryItem of inventoryBatches) {
                    if (remainingQuantity <= 0) break;
    
                    const quantityToDeduct = Math.min(remainingQuantity, inventoryItem.quantity);
    
                    // Deduct the quantity from the batch
                    inventoryItem.quantity -= quantityToDeduct;
                    remainingQuantity -= quantityToDeduct;
    
                    await inventoryItem.save({ transaction });
                }
    
                // If there are still remaining quantities after processing all batches, throw an error
                if (remainingQuantity > 0) {
                    throw new ErrorHandler(
                        `Inventory allocation failed for product ${productId}.`,
                        500
                    );
                }
    
                // Create a SaleProduct record only if the entire quantity has been successfully allocated
                await this.saleProductRepository.create({
                    saleId: sale.id,
                    productId,
                    quantity: totalQuantity,
                }, transaction);
            }
    
            // Commit the transaction
            await transaction.commit();
    
            return sale;
    
        } catch (error) {
            // Rollback the transaction in case of error
            await transaction.rollback();
            console.log(error);
            throw new ErrorHandler((error as Error).message || 'Error creating sale', 500);
        }
    }    

    async getProductWiseSales(productId: string): Promise<Sale[]> {
        try {
            return await this.salesRepository.getProductWiseSales(productId);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error fetching product-wise sales', 500);
        }
    }

    async getAllSales(): Promise<Sale[]> {
        try {
            return await this.salesRepository.getAllSales();
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error fetching all sales', 500);
        }
    }

    async getUserSales(userId: string): Promise<Sale[]> {
        try {
            return await this.salesRepository.getUserSales(userId);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error fetching user sales', 500);
        }
    }
}


class SaleProductService {
    private saleProductRepository: ISaleProductRepository;

    constructor(saleProductRepository: ISaleProductRepository) {
        this.saleProductRepository = saleProductRepository;
    }

    async createSaleProduct(saleProductData: SaleProductCreationAttributes): Promise<SaleProduct> {
        try {
            return await this.saleProductRepository.create(saleProductData);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error creating sales product', 500);
        }
    }
}

export { SalesService, SaleProductService };
