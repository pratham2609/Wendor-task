import app from './app';
import { connectDB } from './config/database';
import { startRedis } from './config/redis';

// Load environment variables
process.loadEnvFile();

const PORT = process.env.PORT || 8080;

// Handle uncaught exceptions
process.on("uncaughtException", (error: Error) => {
    console.error(`Error: ${error.message}`);
    console.error(`Shutting down server due to uncaught exception`);
    process.exit(1);
});

// Start the server and connect to the database
const server = app.listen(PORT, () => {
    connectDB();
    startRedis();
    console.log(`Server is running on port ${PORT}.`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error: Error) => {
    console.error(`Error: ${error.message}`);
    console.error(`Shutting down server due to unhandled promise rejection`);
    server.close(() => process.exit(1));
});
