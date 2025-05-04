import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: { type: String, required: true },
    username: { type: String },
    profilepic: { type: String },
    coverpic: { type: String },
    provider: { type: String },
    patreaon_account: { type: Boolean, default: false },
    patreaon_account_published: { type: Boolean, default: false },
    patreaon_account_username: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || model("User", UserSchema);;