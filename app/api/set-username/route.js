import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';
import User from "@/models/User";
import ConnectDB from "@/db/ConnectDB";

export async function POST(req) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json();
    const username = body.username;

    if (!username || username.trim().length < 4) {
        return NextResponse.json({ error: 'Username must be at least 4 characters' }, { status: 400 });
    }

    try {

        await ConnectDB();

        const existingUser = await User.findOne({ username: username.trim() });
        if (existingUser) {
            return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
        }

        const updateUser = await User.findOneAndUpdate(
            { email: session.user.email },
            { username: username.trim() },
            { new: true }
        )

        if (!updateUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Username set successfully', user: updateUser });


    } catch (error) {
        console.error('Error setting username:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

}