import React from 'react'
import { connectDB } from '@/db/ConnectDB';
import User from '@/models/User';
import { notFound } from 'next/navigation';

async function getUserData(slug) {
    await connectDB();

    const user = await User.findOne({ username: slug });
    console.log(user);
    return user ? JSON.parse(JSON.stringify(user)) : null;
}

export default async function userProfile({ params }) {

    const { slug } = await params;


    if (!slug) {
        return <div>Invalid user slug.</div>;
    }

    const user = await getUserData(slug);

    if (!user) {
        notFound();
    }

    return (
        <>
            <div>
                <h1>{user.username}'s Profile</h1>
                <p>Email: {user.email}</p>
            </div>
        </>
    )
}
