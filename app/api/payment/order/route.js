import ConnectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    try {
        await ConnectDB();

        const body = await req.json();
        const { amount } = body;

        console.log(body);

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: Unauthorized }, { status: 401 });

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: amount * 100, //convert to paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        }

        const order = await razorpay.orders.create(options);
        console.log("razorpay order:", order);
        return NextResponse.json(order);
    } catch (error) {
        console.error("Order API error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
