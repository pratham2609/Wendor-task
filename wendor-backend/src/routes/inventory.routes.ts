import express from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { verifyAdmin, verifyAuth } from '../middlewares/auth';

const router = express.Router();


// -- Common routes --

// Route to get all products in inventory
router.get("/", InventoryController.getAllProductsInInventory)
router.get("/product/one/:productId", InventoryController.getProductDetails);
router.get('/product/one/quantity/:productId', verifyAuth, InventoryController.getSinleProductQuantity);

// -- Admin Routes --

// Route to create inventory
router.post("/add", verifyAuth, verifyAdmin, InventoryController.createInventory);

// Route to get inventory by product ID and batch number
router.get('/product/:productId', verifyAuth, verifyAdmin, InventoryController.getInventoryByProduct);
router.get('/product/:productId/:batchNo', verifyAuth, verifyAdmin, InventoryController.getInventoryByProductAndBatch);

// Route to update and delete inventory
router.route("/product/:productId/:batchNo").put(verifyAuth, verifyAdmin, InventoryController.updateInventory)
    .delete(verifyAuth, verifyAdmin, InventoryController.deleteInventory);

export default router;
