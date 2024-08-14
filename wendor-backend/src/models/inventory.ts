import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import { InventoryAttributes, InventoryCreationAttributes } from "../types/inventory";

class Inventory extends Model<InventoryAttributes, InventoryCreationAttributes> {
    public id!: string;
    public productId!: string;
    public quantity!: number;
    public location?: string; // Optional location
    public batchNo!: string;
}

Inventory.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.UUID,
            references: {
                model: 'products',
                key: 'id',
            },
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        batchNo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Inventory',
        tableName: 'inventories',
        timestamps: true,
    }
);

export default Inventory;
