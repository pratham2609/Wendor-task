import { mailer } from "../config/nodemailer";
import { ApiError } from "../middlewares/ApiError";
import User from "../models/user";
import { PasswordResetRepository } from "../repository/passwordResetRepository";
import { IPasswordResetRepository } from "../types/passwordReset";
import { IUserRepository, UserCreationAttributes } from "../types/user";
import { createResetUrl, removePassword } from "../utils/app.utils";

export class UserService {
    private userRepository: IUserRepository;
    private passwordResetRepo: IPasswordResetRepository;
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
        this.passwordResetRepo = new PasswordResetRepository();
    }

    async getUserById(id: string): Promise<Partial<User> | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return removePassword(user);
    }

    async getUserByEmail(email: string): Promise<Partial<User> | null> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return null;
            }
            return removePassword(user);
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async createUser(userData: UserCreationAttributes): Promise<{ user: Partial<User>, token: string }> {
        if (!userData.email || !userData.fullName || !userData.password) {
            throw new ApiError(400, "All fields are required");
        }

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
        try {
            const updatedUser = await this.userRepository.update(id, userData);
            if (!updatedUser) {
                throw new ApiError(404, "User not found");
            }
            return removePassword(updatedUser);
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async deleteUser(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    async loginUser(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new ApiError(404, "Invalid User");
            }
            if (user.role === "admin") {
                throw new ApiError(401, "Invalid User");
            }
            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid) {
                throw new ApiError(401, "Invalid password");
            }
            const token = user.getJwtToken();
            return { user: removePassword(user), token };
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async loginAdmin(email: string, password: string): Promise<{ user: Partial<User>, token: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new ApiError(404, "Invalid Admin");
            }

            const isPasswordValid = await user.validatePassword(password);
            if (!isPasswordValid) {
                throw new ApiError(401, "Invalid password");
            }
            const token = user.getJwtToken();
            return { user: removePassword(user), token };
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async getTotalUsers(): Promise<number> {
        return await this.userRepository.getTotalUsers();
    }


    async changePassword(id: string, data: { oldPassword: string, newPassword: string }): Promise<void> {
        try {
            const user = await this.userRepository.findById(id);
            if (!user) {
                throw new ApiError(404, "User not found");
            }

            const isPasswordValid = await user.validatePassword(data.oldPassword);
            if (!isPasswordValid) {
                throw new ApiError(401, "Invalid password");
            }

            user.password = data.newPassword;
            await user.save();
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async sendResetPasswordMail(email: string): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            const token = user.generatePasswordResetToken();
            const resetUrl = createResetUrl(token);
            const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000);
            await this.passwordResetRepo.create(email, token, oneHourFromNow);
            mailer.sendResetMail(email, resetUrl);
        } catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }

    async resetForgotPassword(token: string, password: string): Promise<void> {
        try {
            const reset = await this.passwordResetRepo.findByToken(token);
            // check if the token is valid and not expired
            if (!reset || reset.expiration < new Date()) {
                throw new ApiError(400, "Link has been expired");
            }

            const user = await this.userRepository.findByEmail(reset.email);
            if (!user) {
                throw new ApiError(404, "User not found");
            }
            user.password = password;
            await user.save();
            await this.passwordResetRepo.deleteByToken(token);
        }
        catch (error) {
            throw new ApiError(500, (error as Error).message);
        }
    }
}
