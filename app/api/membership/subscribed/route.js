import ConnectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Membership from "@/models/Membership";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await ConnectDB();

        const session = await getServerSession(authOptions);
        if (!session?.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const memberships = await Membership.find({ member: session.user.id }).populate("creator", "username profilepic name");

        return NextResponse.json({ members: memberships }, { status: 200 });


    } catch (error) {
        console.error("Error fetching memberships:", error);
        return NextResponse.json({ message: "Failed to fetch memberships" }, { status: 500 });
    }
}