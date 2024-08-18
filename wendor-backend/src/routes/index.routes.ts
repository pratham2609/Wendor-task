import express from "express";
import userRoutes from "./user.routes";
import productRoutes from "./product.routes";
import companyRoutes from "./company.routes";
import inventoryRoutes from "./inventory.routes";
import salesRoutes from "./sales.routes";
import dashboardRoutes from "./dashboard.routes";

const router = express.Router();

// Use Routes
router.use("/user", userRoutes);
router.use("/products", productRoutes);
router.use("/company", companyRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/sales", salesRoutes);
router.use("/dashboard", dashboardRoutes)


export default router;