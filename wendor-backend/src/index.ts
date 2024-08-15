import app from './app';
import { connectDB } from './config/database';

// Load environment variables
process.loadEnvFile();

const PORT = process.env.PORT || 8080;

// Start the server and connect to the database
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}.`);
});