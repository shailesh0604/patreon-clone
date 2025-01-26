import mongoose, { connect } from "mongoose";

import React from 'react'

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        if (!connectionString) {
            throw new Error("Connection string is invalid");
        }
        const db = await mongoose.connect(connectionString);
        console.log("Successfully Connected to Databse");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}
