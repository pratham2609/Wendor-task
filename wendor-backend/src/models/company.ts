import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import Product from "./product";
import { CompanyAttributes, CompanyCreationAttributes } from "../types/company.js";

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> {
    public id!: string;
    public company_name!: string;
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
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Company',
        tableName: 'companies',
        timestamps: true,
    }
);
Company.hasMany(Product, { foreignKey: 'companyId' });
Product.belongsTo(Company, {
    as: 'company',
    foreignKey: 'companyId',
})

export default Company;
