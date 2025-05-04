import { NextResponse } from 'next/server';
import User from '@/models/User';
import ConnectDB from '@/db/ConnectDB';

export async function POST(req) {
    const { username } = await req.json();

    if (!username || username.trim().length < 4) {
        return NextResponse.json({ error: 'Username must be at least 4 characters' }, { status: 400 });
    }

    try {
        await ConnectDB();

        const existingUser = await User.findOne({ username: username.trim() });

        return NextResponse.json({ exists: !!existingUser });
    } catch (error) {
        console.error('Error checking username:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
