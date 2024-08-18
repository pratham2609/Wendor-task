import { ApiError } from "../middlewares/ApiError";
import User from "../models/user";
import { IUserRepository, UserCreationAttributes } from "../types/user";
import { removePassword } from "../utils/app.utils";

export class UserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getUserById(id: string): Promise<Partial<User> | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return removePassword(user);
    }

    async getUserByEmail(email: string): Promise<Partial<User> | null> {
        const user = await this.userRepository.findByEmail(email, "user");
        if (!user) {
            return null;
        }
        return removePassword(user);
    }

    async createUser(userData: UserCreationAttributes): Promise<{ user: Partial<User>, token: string }> {
        const existingUser = await this.getUserByEmail(userData.email);
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const user = await this.userRepository.create(userData);
        if (!user) {
            throw new ApiError(500, "Error creating user");
        }
        const token = user.getJwtToken();
        return { user: removePassword(user), token };
    }

    async updateUser(id: string, userData: Partial<User>): Promise<Partial<User> | null> {
        const updatedUser = await this.userRepository.update(id, userData);
        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }
        return removePassword(updatedUser);
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async loginUser(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new ApiError(404, "Invalid User");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password");
        }
        const token = user.getJwtToken();
        return { user: removePassword(user), token };
    }

    async loginAdmin(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        const user = await this.userRepository.findByEmail(email, "admin");
        if (!user) {
            throw new ApiError(404, "Invalid Admin");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password");
        }
        const token = user.getJwtToken();
        return { user: removePassword(user), token };
    }

    async getTotalUsers(): Promise<number> {
        return await this.userRepository.getTotalUsers();
    }
}
