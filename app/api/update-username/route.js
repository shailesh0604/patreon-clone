import ConnectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from 'next/server';

export async function POST(req, res) {


    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }

    const { username } = await req.json();

    if (!username || username.trim().length < 4) {
        return NextResponse.json({ message: "Invalid Username" }, { status: 400 });
    }

    try {
        await ConnectDB();

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ message: "Username already taken" }, { status: 400 });
        }

        await User.updateOne(
            { email: session.user.email },
            { $set: { username } }
        );

        return NextResponse.json({ message: "Username updated successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}