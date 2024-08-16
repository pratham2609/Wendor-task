import { Request, Response, NextFunction } from "express";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import InventoryRepository from "../repository/inventoryRepository.js";
import InventoryService from "../services/inventoryService.js";


const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);
export class InventoryController {
    // Get inventory by product ID
    static getInventoryByProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.findByProductId(req.params.productId);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get single product details from inventory
    static getProductDetails = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.getProductDetails(req.params.productId);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get inventory by product ID and batch number
    static getInventoryByProductAndBatch = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.findProductByBatch(req.params.productId, req.params.batchNo);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get all inventories
    static getAllProductsInInventory = catchAsyncError(async (_: Request, res: Response, next: NextFunction) => {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json({ success: true, data: inventories });
    });

    // Get single product quantity
    static getSinleProductQuantity = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const quantity = await inventoryService.getSingleProductQuantity(req.params.productId);
        res.status(200).json({ success: true, data: quantity });
    });

    // Create new inventory
    static createInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const inventory = await inventoryService.addInventory(req.body);
        res.status(201).json({ success: true, data: inventory });
    });

    // Update existing inventory
    static updateInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await inventoryService.updateInventory(req.params.productId, req.params.batchNo, req.body);
        res.status(200).json({ success: true, message: "Updated Successfully" });
    });

    // Delete inventory
    static deleteInventory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await inventoryService.deleteInventory(req.params.id);
        res.status(200).json({ success: true, message: 'Inventory deleted' });
    });
}
