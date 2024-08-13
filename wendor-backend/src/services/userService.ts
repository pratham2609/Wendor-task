import User from "../models/user";
import { IUserRepository, UserCreationAttributes } from "../types/user";
import ErrorHandler from "../utils/errorHandler.js";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new ErrorHandler("User not found", 404);
            }
            return user;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error fetching user by ID", 500);
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new ErrorHandler("User not found", 404);
            }
            return user;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error fetching user by email", 500);
        }
    }

    async createUser(userData: UserCreationAttributes): Promise<{ user: User, token: string }> {
        try {
            const existingUser = await this.getUserByEmail(userData.email);
            if (existingUser) {
                throw new ErrorHandler("User already exists", 400);
            }

            const user = await this.userRepository.create(userData);
            const token = user.getJwtToken();
            return { user, token };
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error creating user", 500);
        }
    }

    async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
        try {
            const updatedUser = await this.userRepository.update(id, userData);
            if (!updatedUser) {
                throw new ErrorHandler("User not found", 404);
            }
            return updatedUser;
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error updating user", 500);
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.userRepository.delete(id);
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error deleting user", 500);
        }
    }

    async loginUser(email: string, password: string): Promise<{ user: User, token: string }> {
        try {
            const user = await this.userRepository.authenticateUser(email, password);
            if (!user) {
                throw new ErrorHandler("Invalid email or password", 401);
            }
            const token = user.getJwtToken();
            return { user, token };
        } catch (error) {
            throw new ErrorHandler((error as Error).message || "Error during user authentication", 500);
        }
    }
}
