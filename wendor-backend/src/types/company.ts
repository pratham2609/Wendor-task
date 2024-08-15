import { Optional } from "sequelize";
import Company from "../models/company";

export interface ICompanyRepository {
    findById(id: string): Promise<Company | null>;
    findByName(company_name: string): Promise<Company | null>;
    getAllCompanies(): Promise<CompanyResponse>;
    create(company: CompanyCreationAttributes): Promise<Company>;
    update(id: string, company: CompanyCreationAttributes): Promise<Company>;
    delete(id: string): Promise<void>;
}

export interface CompanyAttributes {
    id: string;
    company_name: string;
}

export interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> { }

export interface CompanyResponse {
    companies: Company[];
    totalCount: number;
}