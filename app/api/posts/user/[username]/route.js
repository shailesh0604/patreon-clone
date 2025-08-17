import ConnectDB from "@/db/ConnectDB";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        await ConnectDB();
        const { username } = params;

        const posts = await Posts.find({ username, status: "published" }).sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return NextResponse.json({ message: "No Post Found" }, { status: 404 });
        }

        return NextResponse.json(posts, { status: 200 });


    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error fetching posts", error: error.message },
            { status: 500 }
        );
    }
}