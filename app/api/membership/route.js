import ConnectDB from "@/db/ConnectDB";
import Membership from "@/models/Membership";
import { NextResponse } from "next/server";
import getServerSession from "next-auth";

// post request
export async function POST(req) {
    try {
        await ConnectDB();
        const { creatorId, tier } = await req.json();
        console.log("Request body:", creatorId, tier);

        const session = await getServerSession();
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const memberId = session?.user?.id;

        if (memberId === creatorId) return NextResponse.json({ message: "Cannot subscribe to yourself" }, { status: 400 });

        const isExist = await Membership.findOne({ member: memberId, creator: creatorId });

        if (isExist) return NextResponse.json({ message: "Already a member" }, { status: 200 });

        const membership = await Membership.create({ member: memberId, creator: creatorId, tier: tier || "normal" });

        return NextResponse.json({ success: true, membership }, { status: 201 });

    } catch (error) {
        console.error("❌ API Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// delete request
export async function DELETE(req) {
    try {
        await ConnectDB();
        const { creatorId } = await req.json();

        const session = await getServerSession();
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const memberId = session?.user?.id;

        await Membership.findByIdAndDelete({ member: memberId, creator: creatorId });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}