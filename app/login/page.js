import Login from "./Login";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Login | Patreon",
    description: 'Join now and support your favorite creators.',
    icons: {
        icon: '/assets/images/icons/favicon.png',
    },
}


export default async function LoginPage() {

    const session = await auth();

    if (session) {
        redirect("/home");
    }


    return <Login />
}