import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Product from './product';
import { SaleAttributes, SaleCreationAttributes, SaleProductAttributes, SaleProductCreationAttributes } from '../types/sale';

class Sale extends Model<SaleAttributes, SaleCreationAttributes> {
    public id!: string;
    public userId!: string;
    public totalPrice!: number;
    public createdAt!: Date;
}

Sale.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Sale',
        tableName: 'sales',
    }
);

class SaleProduct extends Model<SaleProductAttributes, SaleProductCreationAttributes> {
    public id!: string;
    public saleId!: string;
    public productId!: string;
    public quantity!: number;
}

SaleProduct.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        saleId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Sale,
                key: 'id',
            },
        },
        productId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Product,
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'SaleProduct',
        tableName: 'sale_products',
    }
);


Sale.hasMany(SaleProduct, { foreignKey: 'saleId', as: 'saleProducts' });
SaleProduct.belongsTo(Sale, { foreignKey: 'saleId' });
SaleProduct.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
Product.hasMany(SaleProduct, { foreignKey: 'productId', as: 'saleProducts' });

export { Sale, SaleProduct };
