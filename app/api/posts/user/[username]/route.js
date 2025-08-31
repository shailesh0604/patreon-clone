import ConnectDB from "@/db/ConnectDB";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await ConnectDB();
        const { username } = params;

        const posts = await Posts.find({ username, status: "published", isDeleted: false }).sort({ createdAt: -1 });

        return NextResponse.json(posts, { status: 200 });


    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { message: "Error fetching posts", error: error.message },
            { status: 500 }
        );
    }
}