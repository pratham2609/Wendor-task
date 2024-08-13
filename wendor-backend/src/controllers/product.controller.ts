import { Request, Response, NextFunction } from "express";
import ProductRepository from "../repository/productRepository";
import catchAsyncError from "../middlewares/catchAsyncError";
import { ProductService } from "../services/productService";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
    static findById = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const product = await productService.findById(req.params.id);
        res.status(200).json({ success: true, data: product });
    });

    static findByCategory = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const products = await productService.findByCategory(req.params.category);
        res.status(200).json({ success: true, data: products });
    });

    static findByCompany = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const products = await productService.findByCompany(req.params.companyName);
        res.status(200).json({ success: true, data: products });
    });

    static getAllProducts = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const products = await productService.getAllProducts();
        res.status(200).json({ success: true, data: products });
    });

    static createProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const product = await productService.createProduct(req.body);
        res.status(201).json({ success: true, data: product });
    });

    static updateProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedProduct });
    });

    static deleteProduct = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: "Product deleted" });
    });
}
