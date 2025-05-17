import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    profilepic: { type: String },
    coverpic: { type: String },
    provider: { type: String },
    patreaon_account: { type: Boolean, default: false },
    patreaon_account_published: { type: Boolean, default: false },
    patreaon_account_username: { type: String, default: null },
}, { timestamps: true });

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;