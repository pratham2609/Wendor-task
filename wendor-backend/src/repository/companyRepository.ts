import { ICompanyRepository, CompanyCreationAttributes, CompanyResponse } from "../types/company";
import Company from "../models/company";

class CompanyRepository implements ICompanyRepository {

    async findById(id: string): Promise<Company | null> {
        return await Company.findByPk(id);
    }

    async findByName(company_name: string): Promise<Company | null> {
        return await Company.findOne({ where: { company_name } });
    }

    async getAllCompanies(page?: number, pageSize?: number): Promise<CompanyResponse> {
        const offset = page && pageSize ? (page - 1) * pageSize : undefined;
        const limit = pageSize;
        const { count, rows } = await Company.findAndCountAll({
            limit,
            offset
        });
        return {
            totalCount: count,
            companies: rows
        }
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
