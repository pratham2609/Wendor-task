import express from "express";
import { ProductController } from "../controllers/product.controller";

const router = express.Router();

// Route to create a new product
router.post("/create", ProductController.createProduct);

// Route to get all products
router.get("/", ProductController.getAllProducts);

// Route to get product by id, update product, and delete product
router.route("/:id").get(ProductController.findById)
    .put(ProductController.updateProduct)
    .delete(ProductController.deleteProduct);

// Route to get product by category and company
router.get("/:category", ProductController.findByCategory);
router.get("/:companyId", ProductController.findByCompany);

export default router;
