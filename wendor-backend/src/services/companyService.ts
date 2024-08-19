import { ICompanyRepository, CompanyCreationAttributes, CompanyResponse } from "../types/company";
import Company from "../models/company";
import { ApiError } from "../middlewares/ApiError";

class CompanyService {
    private companyRepository: ICompanyRepository;

    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async getAllCompanies(): Promise<CompanyResponse> {
        try {
            const companies = await this.companyRepository.getAllCompanies();
            return companies;
        } catch (error) {
            throw new ApiError(500, 'Error fetching companies');
        }
    }

    async createCompany(company_name: string): Promise<Company> {
        try {
            const company = await this.companyRepository.create(company_name);
            return company;
        } catch (error) {
            throw new ApiError(500, 'Error creating company');
        }
    }

    async updateCompany(id: string, companyData: CompanyCreationAttributes): Promise<Company> {
        try {
            const updatedCompany = await this.companyRepository.update(id, companyData);
            if (!updatedCompany) {
                throw new ApiError(404, 'Company not found');
            }
            return updatedCompany;
        } catch (error) {
            throw new ApiError(500, 'Error updating company');
        }
    }

    async deleteCompany(id: string): Promise<void> {
        try {
            await this.companyRepository.delete(id);
        } catch (error) {
            throw new ApiError(500, 'Error deleting company');
        }
    }
}

export default CompanyService;
