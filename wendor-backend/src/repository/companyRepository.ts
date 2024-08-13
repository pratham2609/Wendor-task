import { ICompanyRepository, CompanyCreationAttributes } from "../types/company";
import Company from "../models/company";

class CompanyRepository implements ICompanyRepository {

    async findById(id: string): Promise<Company | null> {
        return await Company.findByPk(id);
    }

    async findByName(company_name: string): Promise<Company | null> {
        return await Company.findOne({ where: { company_name } });
    }

    async getAllCompanies(): Promise<Company[]> {
        return await Company.findAll();
    }

    async create(company: CompanyCreationAttributes): Promise<Company> {
        return await Company.create(company);
    }

    async update(id: string, company: CompanyCreationAttributes): Promise<Company> {
        const existingCompany = await Company.findByPk(id);
        if (!existingCompany) {
            throw new Error('Company not found');
        }
        return await existingCompany.update(company);
    }

    async delete(id: string): Promise<void> {
        const company = await Company.findByPk(id);
        if (company) {
            await company.destroy();
        } else {
            throw new Error('Company not found');
        }
    }
}

export default CompanyRepository;
