import { Request, Response } from "express";
import ProductRepository from "../repository/productRepository";
import catchAsyncError from "../middlewares/catchAsyncError";
import { ProductService } from "../services/productService";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

export class ProductController {
    static findById = catchAsyncError(async (req: Request, res: Response) => {
        const product = await productService.findById(req.params.id);
        res.status(200).json({ success: true, data: product });
    });

    static findByCategory = catchAsyncError(async (req: Request, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
        const response = await productService.findByCategory(req.params.category, page, pageSize);
        res.status(200).json({ success: true, data: response });
    });

    static findByCompany = catchAsyncError(async (req: Request, res: Response) => {
        const response = await productService.findByCompany(req.params.companyId);
        res.status(200).json({ success: true, data: response });
    });

    static getAllProducts = catchAsyncError(async (req: Request, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
        const response = await productService.getAllProducts(page, pageSize);
        res.status(200).json({ success: true, data: response });
    });

    static createProduct = catchAsyncError(async (req: Request, res: Response) => {
        const {
            name,
            price,
            category,
            barcodeNo,
            companyId,
            image_url,
            company_name
        } = req.body;
        const product = await productService.createProduct({
            name,
            price,
            category,
            barcodeNo,
            companyId,
            display_image_url: req.fileUrl ?? image_url,
            company_name
        });
        res.status(201).json({ success: true, data: product });
    });

    static updateProduct = catchAsyncError(async (req: Request, res: Response) => {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedProduct });
    });

    static deleteProduct = catchAsyncError(async (req: Request, res: Response) => {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, message: "Product deleted" });
    });

    static findByBarcode = catchAsyncError(async (req: Request, res: Response) => {
        const product = await productService.findByBarcode(req.params.barcodeNo);
        res.status(200).json({ success: true, data: product });
    });
}
