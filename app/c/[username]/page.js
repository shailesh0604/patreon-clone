import React from 'react'
import CreatorPageView from './CreatorPageView'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'



export const metadata = {
    title: "Creator Page | Patreon",
    description: 'Join now and support your favorite creators.',
    icons: {
        icon: '/assets/images/icons/favicon.png',
    },
}


export default async function CreatorPage({ params }) {

    const session = await auth();

    if (session) {
        const loggedInUsername = session?.user?.patreon_account_username;
        const pageUsername = await params.username;

        console.log(`page user : ${pageUsername}`);

        if (loggedInUsername !== pageUsername) {
            return (
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-2xl text-red-600 font-semibold">403 - Unauthorized</h1>
                </div>
            );
        }


        return (
            <div>
                <CreatorPageView />
            </div>
        )
    }
    else {
        redirect("/login");
    }
}
