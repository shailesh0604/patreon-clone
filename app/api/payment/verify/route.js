import { NextResponse } from "next/server";
import crypto from "crypto";
import ConnectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Membership from "@/models/Membership";

export async function POST(req, res) {
    try {
        await ConnectDB();

        const body = await req.json();

        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            creatorId,
            tier,
            amount,
            currency, } = body;

        const session = await getServerSession(authOptions);

        if (!session) return NextResponse.json({ error: Unauthorized }, { status: 401 });


        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign.toString()).digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: "Invalid signature" },
                { status: 400 }
            );
        }


        // save membership
        const membership = await Membership.create({
            member: session.user.id,
            creator: creatorId,
            tier,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            currency: currency || "INR",
            payment_status: "captured",
            status: "active",
        });

        return NextResponse.json({ success: true, membership });

    } catch (error) {

    }
}