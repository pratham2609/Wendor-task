import express from 'express';
import { InventoryController } from '../controllers/inventory.controller';

const router = express.Router();

// Route to get all inventories and create new inventory
router.route("/").get(InventoryController.getAllInventories)
    .post(InventoryController.createInventory);

// Route to get inventory by product ID and batch number
router.get('/product/:productId', InventoryController.getInventoryByProduct);
router.get('/product/:productId/:batchNo', InventoryController.getInventoryByProductAndBatch);

// Route to update and delete inventory
router.route("/product/:productId/:batchNo").put(InventoryController.updateInventory)
    .delete(InventoryController.deleteInventory);

export default router;
