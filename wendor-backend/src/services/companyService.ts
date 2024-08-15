import { ICompanyRepository, CompanyCreationAttributes, CompanyResponse } from "../types/company";
import Company from "../models/company";
import ErrorHandler from "../utils/errorHandler";

class CompanyService {
    private companyRepository: ICompanyRepository;

    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async getAllCompanies(): Promise<CompanyResponse> {
        try {
            return await this.companyRepository.getAllCompanies();
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error retrieving companies', 500);
        }
    }

    async createCompany(companyData: CompanyCreationAttributes): Promise<Company> {
        try {
            return await this.companyRepository.create(companyData);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error creating company', 500);
        }
    }

    async updateCompany(id: string, companyData: CompanyCreationAttributes): Promise<Company> {
        try {
            const updatedCompany = await this.companyRepository.update(id, companyData);
            if (!updatedCompany) {
                throw new ErrorHandler('Company not found', 404);
            }
            return updatedCompany;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error updating company', 500);
        }
    }

    async deleteCompany(id: string): Promise<void> {
        try {
            await this.companyRepository.delete(id);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || 'Error deleting company', 500);
        }
    }
}

export default CompanyService;
