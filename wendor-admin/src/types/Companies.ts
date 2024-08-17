export interface Company {
    id: string;
    company_name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CompanyRes {
    companies: Company[];
    totalCount: number;
}