// src/repositories/PasswordResetRepository.ts
import PasswordReset from "../models/PasswordReset";
import { IPasswordResetRepository } from "../types/passwordReset";

export class PasswordResetRepository implements IPasswordResetRepository {
    async create(email: string, token: string, expiration: Date): Promise<PasswordReset> {
        return await PasswordReset.create({ email, token, expiration });
    }

    async findByToken(token: string): Promise<PasswordReset | null> {
        return await PasswordReset.findOne({ where: { token } });
    }

    async deleteByToken(token: string): Promise<void> {
        await PasswordReset.destroy({ where: { token } });
    }
}
