import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import { UserAttributes, UserCreationAttributes, UserRoles } from "../types/user.js";
import bcryptjs from "bcryptjs";
import { Sale } from "./sale.js";
import { ApiError } from "../middlewares/ApiError.js";
import crypto from "crypto"

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public fullName!: string;
    public avatar!: string;
    public email!: string;
    public password!: string;
    public role!: UserRoles

    // Generate JWT token for the user
    public getJwtToken(): string {
        return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET!);
    }

    // Generate a password reset token
    public generatePasswordResetToken(): string {
        const resetToken = crypto.randomBytes(32).toString('hex');
        return resetToken;
    }

    // Hash the password before saving the user to the database
    public async hashPassword(): Promise<void> {
        if (this.password) {
            this.password = await bcryptjs.hash(this.password, await bcryptjs.genSalt(10));
        }
    }

    // Validate the provided password
    public async validatePassword(enteredPassword: string): Promise<boolean> {
        return await bcryptjs.compare(enteredPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 100],
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "https://storage.googleapis.com/wendor/avatars/avatar.png",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmailValid(value: string) {
                    if (!validator.isEmail(value)) {
                        throw new ApiError(400, "Please provide a valid email address");
                    }
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100], // Password must be at least 8 characters long
            },
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        }
    },
    {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        hooks: {
            // Hash the password before saving the user
            beforeSave: async (user: User) => {
                if (user.changed("password")) {
                    await user.hashPassword();
                }
            },
        },
    }
);

Sale.belongsTo(User, {
    as: 'user',
    foreignKey: 'userId',
    targetKey: 'id',
})

export default User;
