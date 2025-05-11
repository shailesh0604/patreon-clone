import { notFound } from "next/navigation";
import Media from "@/models/UserMedia";
import Image from 'next/image'
import NavbarUser from "@/Components/User/NavbarUser";
import UserInfo from "@/Components/User/UserInfo";
import ConnectDB from "@/db/ConnectDB";


export default async function UserPage({ params }) {
    const { userId } = await params;

    try {
        await ConnectDB();

        const userData = await Media.findOne({ username: userId });

        if (!userData) return notFound();

        return (
            <>
                <NavbarUser />
                <UserInfo />

                <div className="p-6">
                    <h1 className="text-2xl font-bold">User Media: {userId}</h1>

                    <div className="grid grid-cols-2 gap-4">
                        {userData.images?.map((img, idx) => (
                            <Image key={idx} width="600" height="600" sizes="100" src={img} alt={`Image ${idx}`} className="rounded-lg shadow-md w-40" />
                        ))}
                        {userData.videos?.map((vid, idx) => (
                            <video key={idx} controls className="rounded-lg shadow-md w-full">
                                <source src={vid} type="video/mp4" />
                            </video>
                        ))}
                    </div>
                </div>
            </>
        );
    } catch (error) {
        console.error("Fetching User Data Error:", error);
        return notFound();
    }
}
