import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import InventoryRepository from "../repository/inventoryRepository.js";
import InventoryService from "../services/inventoryService.js";
import { ApiError } from "../middlewares/ApiError.js";


const inventoryRepository = new InventoryRepository();
const inventoryService = new InventoryService(inventoryRepository);
export class InventoryController {
    // Get inventory by product ID
    static getInventoryByProduct = catchAsyncError(async (req: Request, res: Response) => {
        const { productId } = req.params;
        if (!productId) {
            throw new ApiError(404, "Product id not found");
        }
        const inventories = await inventoryService.findByProductId(productId);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get single product details from inventory
    static getProductDetails = catchAsyncError(async (req: Request, res: Response) => {
        const inventories = await inventoryService.getProductDetails(req.params.productId);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get inventory by product ID and batch number
    static getInventoryByProductAndBatch = catchAsyncError(async (req: Request, res: Response) => {
        const inventories = await inventoryService.findProductByBatch(req.params.productId, req.params.batchNo);
        res.status(200).json({ success: true, data: inventories });
    });

    // Get all inventories
    static getAllProductsInInventory = catchAsyncError(async (_: Request, res: Response) => {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json({ success: true, data: inventories });
    });

    // Get single product quantity
    static getSinleProductQuantity = catchAsyncError(async (req: Request, res: Response) => {
        const quantity = await inventoryService.getSingleProductQuantity(req.params.productId);
        res.status(200).json({ success: true, data: quantity });
    });

    // Create new inventory
    static createInventory = catchAsyncError(async (req: Request, res: Response) => {
        const inventory = await inventoryService.addInventory(req.body);
        res.status(201).json({ success: true, data: inventory });
    });

    // Create inventory bulk
    static createBulkInventory = catchAsyncError(async (req: Request, res: Response) => {
        await inventoryService.createBulkInventory(req.body);
        res.status(201).json({ success: true, message: "Added Successfully!" });
    });

    // Update existing inventory
    static updateInventory = catchAsyncError(async (req: Request, res: Response) => {
        await inventoryService.updateInventory(req.params.inventoryId, req.body);
        res.status(200).json({ success: true, message: "Updated Successfully!" });
    });

    // Delete Product inventory
    static deleteProductInventory = catchAsyncError(async (req: Request, res: Response) => {
        await inventoryService.deleteProductInventory(req.params.productId);
        res.status(200).json({ success: true, message: 'Inventory deleted' });
    });

    // Delete Product inventory
    static deleteProductBatchInventory = catchAsyncError(async (req: Request, res: Response) => {
        await inventoryService.deleteInventoryBatch(req.params.inventoryId);
        res.status(200).json({ success: true, message: 'Inventory deleted' });
    });
}
