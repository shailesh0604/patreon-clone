import ConnectDB from "@/db/ConnectDB";
import Membership from "@/models/Membership";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";

export async function GET(req) {
    try {
        await ConnectDB();
        const url = new URL(req.url);
        const creatorId = url.searchParams.get("creatorId");
        //console.log("[membership/check] creatorId:", creatorId);


        const session = await getServerSession(authOptions);

        //console.log("[membership/check] session user:", !!session, session?.user);

        if (!session) return NextResponse.json({ isMember: false }, { status: 200 });

        let memberId = undefined;

        if (session?.user?.id) {
            memberId = session.user.id;
        }
        else if (session.user?.patreon_account_username) {
            const dbUser = await User.findOne({ patreon_account_username: session.user.patreon_account_username, });
            memberId = dbUser?._id?.toString();
        }


        if (!memberId) {
            console.log("[membership/check] no memberId available in session");
            return NextResponse.json({ isMember: false }, { status: 200 });
        }

        const membership = await Membership.findOne({
            member: memberId,
            creator: creatorId,
            status: "active",
        });

        //console.log("[membership/check] membership found:", !!membership, membership?._id);
        return NextResponse.json({ isMember: !!membership });

    } catch (error) {
        //console.error("[membership/check] error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

} 