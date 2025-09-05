import ConnectDB from "@/db/ConnectDB";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await ConnectDB();
        const { username } = params;

        const count = await Posts.countDocuments({
            username,
            isDeleted: false,
            status: "published"
        });
        return NextResponse.json({ count });
    } catch (err) {
        // console.error(err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}