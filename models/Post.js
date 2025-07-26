import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    postId: { type: Number, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})