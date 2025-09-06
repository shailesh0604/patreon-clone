import { notFound } from "next/navigation";
import User from "@/models/User";
import NavbarUser from "@/Components/User/NavbarUser";
import UserInfo from "@/Components/User/UserInfo";
import ConnectDB from "@/db/ConnectDB";
import Footer from "@/Components/Footer";


export default async function UserPage({ params }) {
    const { userId } = await params;

    try {
        await ConnectDB();

        const userData = await User.findOne({ username: userId }).lean();

        const plainUser = JSON.parse(JSON.stringify(userData));

        if (!userData || !userData.patreon_account_published) return notFound();

        return (
            <>
                <NavbarUser />
                <UserInfo userData={plainUser} />
                <Footer />
            </>
        );
    } catch (error) {
        // console.error("Fetching User Data Error:", error);
        return notFound();
    }
}
