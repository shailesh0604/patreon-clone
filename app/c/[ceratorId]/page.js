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
