import express from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import companyRoutes from "./company.routes";
import inventoryRoutes from "./inventory.routes";

const router = express.Router();

// Use Routes
router.use("/user", userRoutes);
router.use("/product", productRoutes);
router.use("/company", companyRoutes);
router.use("/inventory", inventoryRoutes);


export default router;