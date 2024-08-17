import { ICompanyRepository, CompanyCreationAttributes, CompanyResponse } from "../types/company";
import Company from "../models/company";
import { ApiError } from "../middlewares/ApiError";

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
            offset,
            order: ['createdAt']
        });
        return {
            totalCount: count,
            companies: rows
        }
    }

    async create(company_name: string): Promise<Company> {
        const company = await this.findByName(company_name);
        if (company) {
            throw new ApiError(400, 'Company already exists');
        }
        return await Company.create({ company_name });
    }

    async update(id: string, company: CompanyCreationAttributes): Promise<Company> {
        const existingCompany = await Company.findByPk(id);
        if (!existingCompany) {
            throw new ApiError(404, 'Company not found');
        }
        return await existingCompany.update(company);
    }

    async delete(id: string): Promise<void> {
        const company = await Company.findByPk(id);
        if (company) {
            await company.destroy();
        } else {
            throw new ApiError(404, 'Company not found');
        }
    }
}

export default CompanyRepository;
