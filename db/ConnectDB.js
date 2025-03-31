import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error("Connection string is invalid");
        }

        if (mongoose.connection.readyState >= 1) {
            // Already connected
            return mongoose.connection;
        }

        await mongoose.connect(connectionString);

        console.log("Successfully connected to Database");

        return mongoose.connection; // ✅ Return the connection
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};
