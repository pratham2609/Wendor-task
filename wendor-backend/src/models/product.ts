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
    public barcodeNo!: string
    public display_image_url!: string
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
            allowNull: false,
            defaultValue: "https://cdn.pixabay.com/photo/2013/07/13/11/53/best-seller-158885_1280.png",
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM(...Object.values(CategoryEnum)),
            allowNull: false,
        },
        barcodeNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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

Inventory.belongsTo(Product, {
    as: 'product',
    foreignKey: 'productId',
    targetKey: 'id',
    onDelete: 'CASCADE',
});


export default Product;
