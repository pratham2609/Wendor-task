import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

class PasswordReset extends Model {
    public id!: string;
    public email!: string;
    public token!: string;
    public expiration!: Date;
}

PasswordReset.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "PasswordReset",
        tableName: "password_resets",
        timestamps: true,
    }
);

export default PasswordReset;
