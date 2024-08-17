import User from "../models/user";

export const Categories = {
    SNACKS: 'Snacks',
    BEVERAGES: 'Beverages',
    HEALTHY_OPTIONS: 'Healthy',
    SANDWICHES: 'Sandiwches',
    DAIRY: 'Dairy',
    BAKED: 'Baked',
    FROZEN: 'Frozen',
    MEDICINES: 'Medicines',
    DAILY_USE: 'Daily use'
};

export const removePassword = (user: User): Partial<User> => {
    const userObject = user.toJSON();
    const { password, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
}
