import React from 'react'
import mongoose, { Model } from 'mongoose'
const { Schema, model } = mongoose;

const PaymentSchema = new Schema({
    name: { type: String, required: true },
    payment_id: { type: String, required: true },
    to_user: { type: String, required: true },
    from_user: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    IsDone: { type: Boolean, default: false },

})

export default mongoose.models.Payment || model("Payment", PaymentSchema);