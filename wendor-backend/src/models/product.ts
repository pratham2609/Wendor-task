import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { CategoryEnum } from "../types/product";
import Company from "./company";

class Product extends Model {
    public id!: string;
    public name!: string;
    public image!: string;
    public mrp!: number;
    public category!: CategoryEnum;
    public companyId!: string;  // Foreign Key

    public readonly createdAt!: Date;
}

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        mrp: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM(...Object.values(CategoryEnum)),
            allowNull: false,
        },
        companyId: {
            type: DataTypes.UUID,
            references: {
                model: 'companies',  // refers to the table name
                key: 'id',
            },
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
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
    }
);

Product.belongsTo(Company, { as: 'company', foreignKey: 'companyId' });

export default Product;
