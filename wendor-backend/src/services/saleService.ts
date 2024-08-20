import { ISaleProductRepository, ISalesRepository, SaleProductCreationAttributes, SaleProductRequest, SalesResponse } from '../types/sale';
import { Sale, SaleProduct } from '../models/sale';
import { IInventoryRepository } from '../types/inventory';
import InventoryRepository from '../repository/inventoryRepository';
import { sequelize } from '../config/database';
import InventoryService from './inventoryService';
import { SaleProductRepository } from '../repository/salesRepository';
import { ApiError } from '../middlewares/ApiError';

class SalesService {
    private salesRepository: ISalesRepository;
    private saleProductRepository: ISaleProductRepository;
    private inventoryRepository: IInventoryRepository;
    private inventoryService: InventoryService;

    constructor(salesRepository: ISalesRepository) {
        this.salesRepository = salesRepository;
        this.saleProductRepository = new SaleProductRepository();
        this.inventoryRepository = new InventoryRepository();
        this.inventoryService = new InventoryService(this.inventoryRepository);
    }

    async findSaleById(id: string): Promise<Sale | null> {
        try {
            const sale = await this.salesRepository.findById(id);
            if (!sale) {
                throw new ApiError(404, 'Sale not found');
            }
            return sale;
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error finding sale by ID');
        }
    }

    async createSale(userId: string, saleProducts: SaleProductRequest[]): Promise<Sale> {
        const transaction = await sequelize.transaction();

        try {
            // Step 1: Calculate total price and check if the total available quantity is sufficient
            let totalPrice = 0;
            const productQuantities: { [productId: string]: number } = {};

            for (const saleProduct of saleProducts) {
                if (!saleProduct.productId || !saleProduct.quantity) {
                    // transaction.rollback();
                    throw new ApiError(400, 'Product ID and quantity are required for each product');
                }
                const productDetails = await this.inventoryService.getProductDetails(saleProduct.productId);
                if (!productDetails) {
                    throw new ApiError(404, `Product details not found for product ID ${saleProduct.productId}`);
                }
                if (productDetails.totalQuantity < saleProduct.quantity) {
                    throw new ApiError(
                        400,
                        `Insufficient inventory available for product ${productDetails.productName}: ${productDetails.totalQuantity}pcs`
                    );
                }
                // Ensure product price is valid
                if (productDetails.productPrice == null) {
                    throw new ApiError(400, `Invalid price for product ${productDetails.productName}`);
                }

                totalPrice += productDetails.productPrice * saleProduct.quantity;
                productQuantities[saleProduct.productId] = (productQuantities[saleProduct.productId] || 0) + saleProduct.quantity;
            }

            // Check if totalPrice was calculated
            if (totalPrice <= 0) {
                throw new ApiError(500, 'Total price calculation error.');
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
                    throw new ApiError(
                        500,
                        `Inventory allocation failed for product ${productId}.`
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
            throw new ApiError(500, (error as Error).message || 'Error creating sale');
        }
    }

    async getAllSales(page?: number, pageSize?: number): Promise<SalesResponse> {
        try {
            return await this.salesRepository.getAllSales(page, pageSize);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching all sales');
        }
    }

    async getUserSales(userId: string, page?: number, pageSize?: number): Promise<SalesResponse> {
        try {
            return await this.salesRepository.getUserSales(userId, page, pageSize);
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching user sales');
        }
    }

    async getTotalSales(): Promise<number> {
        try {
            return await this.salesRepository.getTotalSales();
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching total sales');
        }
    }

    async getTotalRevenue(): Promise<number> {
        try {
            return await this.salesRepository.getTotalRevenue();
        } catch (error) {
            throw new ApiError(500, (error as Error).message || 'Error fetching total revenue');
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
            throw new ApiError(500, (error as Error).message || 'Error creating sales product');
        }
    }
}

export { SalesService, SaleProductService };
