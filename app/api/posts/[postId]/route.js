import ConnectDB from "@/db/ConnectDB";
import Posts from "@/models/Post";
import { NextResponse } from "next/server";
import cloudinary from "@/Components/Cloudinary";
import { Readable } from "stream";

export async function PATCH(req, { params }) {
    try {
        await ConnectDB();

        const { postId } = await params;
        const idNum = Number(postId);

        if (isNaN(idNum)) {
            return NextResponse.json({ message: "Invalid postId" }, { status: 400 });
        }

        const formdata = await req.formData();
        const title = formdata.get("title");
        const content = formdata.get("content");
        const file = formdata.get("media");

        let mediaUrl = null;

        if (file && file.name) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto", folder: "posts" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                Readable.from(buffer).pipe(uploadStream);
            });

            mediaUrl = uploadResult.secure_url;
        }

        const updatedPost = await Posts.findOneAndUpdate(
            { postId: idNum },
            { $set: { title, content, ...(mediaUrl && { media: mediaUrl }), status: "published" } },
            { new: true }
        );

        if (!updatedPost) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post Updated", post: updatedPost }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error updating post", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req, { params }) {
    try {
        await ConnectDB();

        const { postId } = params;
        const idNum = Number(postId);

        if (isNaN(idNum)) {
            return NextResponse.json({ message: "Invalid postId" }, { status: 400 });
        }

        const post = await Posts.findOne({ postId: idNum });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error fetching post", error: error.message },
            { status: 500 }
        );
    }
}
