import mongoose, { Schema } from "mongoose";

const MediaSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    images: [{ type: String }], // Array of Cloudinary image URLs
    videos: [{ type: String }], // Array of Cloudinary video URLs
    uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserMedia || mongoose.model("UserMedia", MediaSchema);