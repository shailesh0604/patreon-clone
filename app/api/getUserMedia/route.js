import { NextResponse } from "next/server";
import { connectDB } from "@/db/ConnectDB";
import Media from "@/models/UserMedia";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        await connectDB();
        const userMedia = await Media.find({ userId });

        return NextResponse.json(userMedia.length ? userMedia : [], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
