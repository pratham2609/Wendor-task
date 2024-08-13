import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Product from "./product";
import { CompanyAttributes, CompanyCreationAttributes } from "../types/company.js";

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> {
    public id!: string;
    public company_name!: string;
    public createdAt!: Date;
}

Company.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'Company',
        tableName: 'companies',
        timestamps: true,
    }
);

Company.hasMany(Product, { as: 'products', foreignKey: 'companyId' });

export default Company;
