import ConnectDB from "@/db/ConnectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from 'next/server';

const sanitizeUsername = (username) => {
    return username.trim().toLowerCase().replace(/[^a-z0-9-_]/g, "");
};

export async function POST(req, res) {


    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 404 });
    }


    try {
        const { username } = await req.json();

        if (!username || username.trim().length < 4) {
            return NextResponse.json({ message: "Invalid Username" }, { status: 400 });
        }

        const cleanUsername = sanitizeUsername(username);


        const isValid = /^[a-z0-9-_]{4,20}$/.test(cleanUsername);
        if (!isValid) {
            return NextResponse.json({ message: "Invalid username format" }, { status: 400 });
        }

        await ConnectDB();

        const existingUser = await User.findOne({ cleanUsername });

        if (existingUser) {
            return NextResponse.json({ message: "Username already taken" }, { status: 400 });
        }

        await User.updateOne(
            { email: session.user.email },
            {
                $set: {
                    username: cleanUsername,
                    patreaon_account: true,
                    patreaon_account_username: cleanUsername,
                }
            },
        );

        return NextResponse.json({ message: "Username updated successfully", username: cleanUsername }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}