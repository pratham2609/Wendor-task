import User from "../models/user";
import { IUserRepository, UserCreationAttributes } from "../types/user";
import ErrorHandler from "../utils/errorHandler";

export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    }

    async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            throw new ErrorHandler('User not found', 401);
        }
        return await existingUser.update(user);
    }

    async delete(id: string): Promise<void> {
        await User.destroy({ where: { id } });
    }

    async verifyAuth(email: string, password: string): Promise<User | null> {
        const user = await this.findByEmail(email);
        if (!user) {
            throw new ErrorHandler("Invalid User", 401);
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            throw new ErrorHandler("Invalid password", 401);
        }

        return user;
    }
}
