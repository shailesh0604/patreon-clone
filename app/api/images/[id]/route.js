import { NextResponse } from "next/server";
import sharp from "sharp";
import ConnectDB from "@/db/ConnectDB";
import Post from "@/models/Post";
import User from "@/models/User";
import Membership from "@/models/Membership";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, { params }) {
    try {
        await ConnectDB();
        const { id } = params;

        const session = await getServerSession(authOptions);

        const post = await Post.findById(id);
        if (!post?.media) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // default: not a member
        let isMember = false;

        if (session?.user?.id) {
            // find the creator of this post
            const creatorUser = await User.findOne({ username: post.username }).select("_id");

            // check membership
            const membership = await Membership.findOne({
                member: session.user.id,
                creator: creatorUser?._id,
                status: "active",
            });

            if (membership) isMember = true;
        }

        // fetch file from Cloudinary (or wherever you store media)
        const res = await fetch(post.media);
        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
        }
        const buffer = Buffer.from(await res.arrayBuffer());

        // Decide response
        if (post.media.match(/\.(mp4|webm|ogg)$/i)) {
            // Video (don’t process with sharp)
            if (isMember) {
                return new NextResponse(buffer, {
                    status: 200,
                    headers: { "Content-Type": "video/mp4" }, // adjust by file type
                });
            } else {
                //  blur/lock not possible for video → show short placeholder
                return NextResponse.json({ error: "Locked video" }, { status: 403 });
            }
        } else {
            // Image
            let processedImage;
            if (isMember) {
                processedImage = await sharp(buffer)
                    .resize(1200)
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else {
                processedImage = await sharp(buffer)
                    .resize(800)
                    .blur(25)
                    .jpeg({ quality: 40 })
                    .toBuffer();
            }

            return new NextResponse(processedImage, {
                status: 200,
                headers: { "Content-Type": "image/jpeg" },
            });
        }
    } catch (err) {
        console.error("Image protection error:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
