import express from 'express';
import { SalesController } from '../controllers/sales.controller';
import { verifyAdmin, verifyAuth } from '../middlewares/auth';

const router = express.Router();

// -- User routes --
// Route to get all sales by admin and create new sale by user
router.route("/").get(verifyAuth, SalesController.getUserSales)
router.post("/create", verifyAuth, SalesController.createSale);
// Route to get user sale by sale ID
router.get('/sale/:id', verifyAuth, SalesController.getSaleById);


// -- Admin routes --

// Route to get all sales by admin
router.get('/all', verifyAuth, verifyAdmin, SalesController.getAllSales);

export default router;
