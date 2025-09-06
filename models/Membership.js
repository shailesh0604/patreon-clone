import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },// subscriber
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //user being subscribed to
    tier: { type: String, enum: ["normal", "pro"], default: "normal" },
    status: { type: String, enum: ["active", "cancelled"], default: "active" }
}, { timestamps: true });

const Membership = mongoose.models?.Membership || mongoose.model("Membership", MembershipSchema);
export default Membership;