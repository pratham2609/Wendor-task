import { Optional } from "sequelize";
import User from "../models/user";

export enum UserRoles {
    ADMIN = "admin",
    USER = "user"
}

export interface UserAttributes {
    id: string; // UUID
    fullName: string;
    avatar: string;
    email: string;
    role: UserRoles
    password: string;
}

// Interface for creating a new User instance
export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "avatar" | "role"> { }

export interface IUserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    verifyAuth(email: string, password: string): Promise<User | null>;
    create(user: UserCreationAttributes): Promise<User>;
    update(id: string, user: Partial<User>): Promise<User | null>;
    delete(id: string): Promise<void>;
}
