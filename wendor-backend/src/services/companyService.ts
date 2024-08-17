import { ICompanyRepository, CompanyCreationAttributes, CompanyResponse } from "../types/company";
import Company from "../models/company";
import { ApiError } from "../middlewares/ApiError";

class CompanyService {
    private companyRepository: ICompanyRepository;

    constructor(companyRepository: ICompanyRepository) {
        this.companyRepository = companyRepository;
    }

    async getAllCompanies(): Promise<CompanyResponse> {
        return this.companyRepository.getAllCompanies();
    }

    async createCompany(company_name: string): Promise<Company> {
        const company = await this.companyRepository.findByName(company_name);
        if (company) {
            throw new ApiError(400, 'Company already exists');
        }
        return this.companyRepository.create(company_name);
    }

    async updateCompany(id: string, companyData: CompanyCreationAttributes): Promise<Company> {
        const updatedCompany = await this.companyRepository.update(id, companyData);
        if (!updatedCompany) {
            throw new ApiError(404, 'Company not found');
        }
        return updatedCompany;
    }

    deleteCompany(id: string): Promise<void> {
        return this.companyRepository.delete(id);
    }
}

export default CompanyService;
