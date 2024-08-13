import { Request, Response, NextFunction } from "express";
import CompanyService from "../services/companyService";
import CompanyRepository from "../repository/companyRepository";
import catchAsyncError from "../middlewares/catchAsyncError";

const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);

export class CompanyController {
    static getAllCompanies = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const companies = await companyService.getAllCompanies();
        res.status(200).json({ success: true, data: companies });
    });

    static createCompany = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const company = await companyService.createCompany(req.body);
        res.status(201).json({ success: true, data: company });
    });

    static updateCompany = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        const updatedCompany = await companyService.updateCompany(req.params.id, req.body);
        res.status(200).json({ success: true, data: updatedCompany });
    });

    static deleteCompany = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
        await companyService.deleteCompany(req.params.id);
        res.status(200).json({ success: true, message: "Company deleted" });
    });
}
