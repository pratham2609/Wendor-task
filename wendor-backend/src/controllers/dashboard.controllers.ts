import { Request, Response } from "express";
import catchAsyncError from "../middlewares/catchAsyncError";
import { DashboardService } from "../services/dashboardService";

const dashboardService = new DashboardService();

export class DashboardController {
    static getDashboardData = catchAsyncError(async (_: Request, res: Response) => {
        const data = await dashboardService.getDashboardData();
        res.status(200).json({ success: true, data: data });
    });
}
