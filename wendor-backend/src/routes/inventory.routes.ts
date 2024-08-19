import express from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { verifyAdmin, verifyAuth } from '../middlewares/auth';

const router = express.Router();


// -- Common routes --

// Route to get all products in inventory
router.get("/", InventoryController.getAllProductsInInventory)
router.get("/product/one/:productId", InventoryController.getProductDetails);
router.get('/product/one/quantity/:productId', verifyAuth, InventoryController.getSinleProductQuantity);
router.get('/search', InventoryController.getSearchedProductsFromInventory)

// -- Admin Routes --

// Route to create inventory
router.post("/add", verifyAuth, verifyAdmin, InventoryController.createBulkInventory);

// Route to get inventory by product ID and batch number
router.route('/product/:productId').get(verifyAuth, verifyAdmin, InventoryController.getInventoryByProduct)
    .delete(verifyAuth, verifyAdmin, InventoryController.deleteProductInventory);

    router.get("/product/:productId/:batchNo", verifyAuth, verifyAdmin, InventoryController.getInventoryByProductAndBatch)

// Route to update and delete inventory

router.route("/product/batch/:inventoryId").delete(verifyAuth, verifyAdmin, InventoryController.deleteProductBatchInventory)
    .put(verifyAuth, verifyAdmin, InventoryController.updateInventory)

export default router;
