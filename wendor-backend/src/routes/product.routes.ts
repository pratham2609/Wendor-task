import express from "express";
import { ProductController } from "../controllers/product.controller";
import { verifyAdmin, verifyAuth } from "../middlewares/auth";
import { multerConfig } from "../config/multer";
import { uploadProductImage } from "../middlewares/uploadFile";

const router = express.Router();

// -- Common routes --
// Route to get product by category and id
router.get("/category/:category", ProductController.findByCategory);


// -- Admin routes --
// Route to get product by Id
router.get("/:id", verifyAuth, verifyAdmin, ProductController.findById);

router.get("/bar/:barcodeNo", verifyAuth, verifyAdmin, ProductController.findByBarcode);

// Route to get products related to company
router.get("/company/:companyId", verifyAuth, verifyAdmin, ProductController.findByCompany);

// Route to get products list and create product
router.route("/").get(verifyAuth, verifyAdmin, ProductController.getAllProducts)
    .post(verifyAuth, verifyAdmin, multerConfig.single('file'), uploadProductImage, ProductController.createProduct);

// Route to get product by id, update product, and delete product
router.route("/:id").put(verifyAuth, verifyAdmin, multerConfig.single('file'), uploadProductImage, ProductController.updateProduct)
    .delete(verifyAuth, verifyAdmin, ProductController.deleteProduct);


export default router;
