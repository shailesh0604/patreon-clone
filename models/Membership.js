import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
    member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },// subscriber
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //user being subscribed to
    tier: { type: String, enum: ["normal", "pro"], default: "normal" },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    razorpay_order_id: { type: String, required: true },
    razorpay_payment_id: { type: String, required: true },
    razorpay_signature: { type: String, required: true },
    payment_status: {
        type: String,
        enum: ["created", "authorized", "captured", "failed"],
        default: "created",
        status: { type: String, enum: ["success", "failed"], default: "failed" },
    }, //payment status
    status: { type: String, enum: ["active", "cancelled"], default: "active" } //membership status
}, { timestamps: true });

const Membership = mongoose.models?.Membership || mongoose.model("Membership", MembershipSchema);
export default Membership;