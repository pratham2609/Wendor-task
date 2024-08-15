export interface Company {
    Id: string;
    companyName: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface CompanyRes {
    companies: Company[];
    totalCount: number;
}