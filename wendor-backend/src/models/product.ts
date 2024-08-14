import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { CategoryEnum, ProductAttributes, ProductCreationAttributes } from "../types/product";
import Inventory from "./inventory.js";

class Product extends Model<ProductAttributes, ProductCreationAttributes> {
    public id!: string;
    public name!: string;
    public image!: string;
    public mrp!: number;
    public category!: CategoryEnum;
    public companyId!: string;  // Foreign Key
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
        display_image_url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "",
        },
        price: {
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
                model: 'companies',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: true,
    }
);

Product.hasMany(Inventory, { as: 'inventories', foreignKey: 'productId' });

export default Product;
