import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import InventoryRepository from "../repository/inventoryRepository.js";
import InventoryService from "../services/inventoryService.js";


const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);
export class InventoryController {
    // Get inventory by product ID
    static getInventoryByProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.findByProduct(req.params.productId);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get inventory by product ID and batch number
    static getInventoryByProductAndBatch = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.findProductByBatch(req.params.productId, req.params.batchNo);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get all inventories
    static getAllInventories = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json({ success: true, data: inventories });
    });

    // Create new inventory
    static createInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventory = await inventoryService.addInventory(req.body);
        res.status(201).json({ success: true, data: inventory });
    });

    // Update existing inventory
    static updateInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const updatedInventory = await inventoryService.updateInventory(req.params.productId, req.params.batchNo, req.body);
        if (!updatedInventory) {
            return next(new ErrorHandler('Inventory not found or no changes made', 404));
        }
        res.status(200).json({ success: true, data: updatedInventory });
    });

    // Delete inventory
    static deleteInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await inventoryService.deleteInventory(req.params.id);
        res.status(200).json({ success: true, message: 'Inventory deleted' });
    });
}
