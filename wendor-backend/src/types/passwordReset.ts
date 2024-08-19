// src/repositories/IPasswordResetRepository.ts

import PasswordReset from "../models/PasswordReset";

export interface IPasswordResetRepository {
    create(email: string, token: string, expiration: Date): Promise<PasswordReset>;
    findByToken(token: string): Promise<PasswordReset | null>;
    deleteByToken(token: string): Promise<void>;
}
