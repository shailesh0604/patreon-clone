import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    postId: { type: Number, required: true, unique: true },
    username: { type: String, required: true },
    title: { type: String },
    content: { type: String },
    media: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    isHidden: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true }
);

const Posts = mongoose.models?.Posts || mongoose.model("Posts", PostSchema);

export default Posts;