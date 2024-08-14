import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/errorHandler';
import { SalesService } from '../services/saleService';
import { SalesRepository } from '../repository/salesRepository';
import { AuthenticatedRequest } from '../middlewares/auth';

const salesRepository = new SalesRepository();
const salesService = new SalesService(salesRepository);

class SalesController {

    static async getSaleById(req: Request, res: Response, next: NextFunction) {
        const sale = await salesService.findSaleById(req.params.id);
        if (!sale) {
            return next(new ErrorHandler('Sale not found', 404));
        }
        res.json({ success: true, data: sale });
    }

    static async createSale(req: AuthenticatedRequest, res: Response) {
        const sale = await salesService.createSale(req.user?.id!, req.body);
        res.status(201).json({ success: true, data: sale });
    }

    static async getProductWiseSales(req: Request, res: Response) {
        const sales = await salesService.getProductWiseSales(req.params.productId);
        res.json({ success: true, data: sales });
    }

    static async getAllSales(req: Request, res: Response) {
        const sales = await salesService.getAllSales();
        res.json({ success: true, data: sales });
    }

    static async getUserSales(req: Request, res: Response) {
        const sales = await salesService.getUserSales(req.params.userId);
        res.json({ success: true, data: sales });
    }
}

export { SalesController };
