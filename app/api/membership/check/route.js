import ConnectDB from "@/db/ConnectDB";
import Membership from "@/models/Membership";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
    try {
        await ConnectDB();
        const { searchParams } = new URL(req.url);
        const creatorId = searchParams.get("creatorId");

        const session = await getServerSession(authOptions);

        if (!session) return NextResponse.json({ isMember: false }, { status: 200 });

        const memberId = session?.user?.id;

        const membership = await Membership.findOne({
            member: memberId,
            creator: creatorId,
            status: "active",
        });


        return NextResponse.json({ isMember: !!membership });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

} 