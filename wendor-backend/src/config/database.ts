import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        port: parseInt(process.env.DB_PORT!),
        dialect: "postgres",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false });
        console.log(`Connected to database: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};