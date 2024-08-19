import User from "../models/user";

export const Categories = {
    SNACKS: 'Snacks',
    BEVERAGES: 'Beverages',
    HEALTHY_OPTIONS: 'Healthy',
    SANDWICHES: 'Sandiwches',
    DAIRY: 'Dairy',
    BAKED: 'Baked',
    FROZEN: 'Frozen',
    DRINKS: 'Drinks',
    SWEETS: 'Sweets'
};

export const removePassword = (user: User): Partial<User> => {
    const userObject = user.toJSON();
    const { password, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
}
process.loadEnvFile();

export const createResetUrl = (token: string): string => {
    return `${process.env.WEBSITE_URL}/auth/reset-password?token=${token}`;
}