import { Optional } from "sequelize";
import User from "../models/user";

// Interface for all attributes of the User model
export interface UserAttributes {
    id: string; // UUID
    fullName: string;
    petName: string;
    avatar: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Interface for creating a new User instance
export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt" | "avatar" | "isEmailVerified"> { }

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    authenticateUser(email: string, password: string): Promise<User | null>;
    create(user: UserCreationAttributes): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<void>;
}
