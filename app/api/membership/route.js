import ConnectDB from "@/db/ConnectDB";
import Membership from "@/models/Membership";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// post request
export async function POST(req) {
    try {
        await ConnectDB();

        const { creatorId, tier } = await req.json();
        //console.log("Request body:", creatorId, tier);

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const memberId = session?.user?.id;
        //console.log(`member id : ${memberId}`);

        if (memberId === creatorId) return NextResponse.json({ message: "Cannot subscribe to yourself" }, { status: 202 });

        const isExist = await Membership.findOne({ member: memberId, creator: creatorId });

        if (isExist) return NextResponse.json({ message: "Already a member" }, { status: 200 });

        const membership = await Membership.create({ member: memberId, creator: creatorId, tier: tier || "normal", status: "active" });

        return NextResponse.json({ success: true, membership }, { status: 201 });

    } catch (error) {
        //console.error("❌ API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// patch request
export async function PATCH(req) {
    try {
        await ConnectDB();

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { creatorId } = await req.json();

        const memberId = session?.user?.id;

        //console.log(`creator id : ${creatorId},/n member id : ${memberId}`);

        const deleted = await Membership.findOneAndUpdate({ member: memberId, creator: creatorId }, { status: "cancelled" }, { new: true });

        if (!deleted) return NextResponse.json({ message: "Membership not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// delete request
export async function DELETE(req) {
    try {
        await ConnectDB();

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { creatorId } = await req.json();

        const memberId = session?.user?.id;

        //console.log(`creator id : ${creatorId},/n member id : ${memberId}`);

        const deleted = await Membership.findOneAndDelete({ member: memberId, creator: creatorId });

        if (!deleted) return NextResponse.json({ message: "Membership not found" }, { status: 404 });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}

// get request
export async function GET(req) {
    try {
        await ConnectDB();

        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const memberId = session.user.id;

        const memberships = await Membership.find({
            member: memberId,
            status: "active"    // only active memberships
        }).populate("creator", "username profilepic name");

        return NextResponse.json(memberships, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
