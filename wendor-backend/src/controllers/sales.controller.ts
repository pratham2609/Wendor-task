import { Request, Response, NextFunction } from 'express';
import { SalesService } from '../services/saleService';
import { SalesRepository } from '../repository/salesRepository';
import catchAsyncError from '../middlewares/catchAsyncError';

const salesRepository = new SalesRepository();
const salesService = new SalesService(salesRepository);

class SalesController {

    static getSaleById = catchAsyncError(async (req: Request, res: Response) => {
        const sale = await salesService.findSaleById(req.params.id);
        res.json({ success: true, data: sale });
    })

    static createSale = catchAsyncError(async (req: Request, res: Response) => {
        const sale = await salesService.createSale(req.user?.id!, req.body);
        res.status(201).json({ success: true, data: sale });
    })

    static getAllSales = catchAsyncError(async (req: Request, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
        const sales = await salesService.getAllSales(page, pageSize);
        res.json({ success: true, data: sales });
    })

    static getUserSales = catchAsyncError(async (req: Request, res: Response) => {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : undefined;
        const sales = await salesService.getUserSales(req.user?.id!, page, pageSize);
        res.json({ success: true, data: sales });
    })
}

export { SalesController };
