import { ApiError } from "../middlewares/ApiError";
import User from "../models/user";
import { IUserRepository, UserCreationAttributes } from "../types/user";

export class UserRepository implements IUserRepository {
    async findById(id: string): Promise<User | null> {
        return await User.findOne({ where: { id } });
    }

    async findByEmail(email: string, role?: string): Promise<User | null> {
        return await User.findOne({ where: { email, role } });
    }

    async create(user: UserCreationAttributes): Promise<User> {
        return await User.create(user);
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            throw new ApiError(404, 'User not found');
        }
        return await existingUser.update(user);
    }

    async delete(id: string): Promise<void> {
        await User.destroy({ where: { id } });
    }

    async getTotalUsers(): Promise<number> {
        return await User.count();
    }
}
