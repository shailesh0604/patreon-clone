import ConnectDB from "@/db/ConnectDB";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    await ConnectDB();

    const postId = params;
    const { title, content } = await req.json();

    const updatePost = await Posts.findOneAndUpdate(
        { postId: parseInt(postId) },
        { $set: { title, content } },
        { new: true },
    );

    if (!updatePost) {
        return NextResponse.json({ message: "Post not found" }), { status: 404 }
    }

    return NextResponse.json({ message: "Post Updated", post: updatePost }), { status: 200 };

}

export async function GET(req, { params }) {
    await ConnectDB();

    const { postId } = params;

    const post = await Posts.findOne({ postId: parseInt(postId) });

    if (!post) return new Response("Post not found", { status: 404 });

    return Response.json(post);
}