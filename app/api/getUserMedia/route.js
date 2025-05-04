import { NextResponse } from "next/server";
import Media from "@/models/UserMedia";
import ConnectDB from "@/db/ConnectDB";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        await ConnectDB();
        const userMedia = await Media.find({ userId });

        return NextResponse.json(userMedia.length ? userMedia : [], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
