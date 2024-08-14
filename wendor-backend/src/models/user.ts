import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import ErrorHandler from "../utils/errorHandler.js";
import { UserAttributes, UserCreationAttributes, UserRoles } from "../types/user.js";
import bcryptjs from "bcryptjs";

class User extends Model<UserAttributes, UserCreationAttributes> {
    public id!: string;
    public fullName!: string;
    public avatar!: string;
    public email!: string;
    public password!: string;
    public role!: UserRoles

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Generate JWT token for the user
    public getJwtToken(): string {
        const expiresIn = process.env.JWT_EXPIRES_TIME || '7d'; // Default to '7d' if not set
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET!, {
            expiresIn,
        });
    }

    // Virtual field to get the full avatar URL
    public get avatarUrl(): string | null {
        if (!this.avatar) return null;
        return `${process.env.AWS_CLOUDFRONT_BASE_URL!}/${this.avatar}`;
    }

    // Prevent direct setting of avatarUrl
    public set avatarUrl(_value: string) {
        throw new Error("Do not try to set the `avatarUrl` value!");
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

// Initialize the User model with attributes
User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "User",
            validate: {
                len: [2, 100],
            },
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmailValid(value: string) {
                    if (!validator.isEmail(value)) {
                        throw new ErrorHandler("Please provide a valid email address", 400);
                    }
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 100], // Password must be at least 6 characters long
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

export default User;
