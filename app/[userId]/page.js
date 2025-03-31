import { notFound } from "next/navigation";
import { connectDB } from "@/db/ConnectDB";
import Media from "@/models/UserMedia";

export default async function UserPage({ params }) {
    const { userId } = await params;

    try {
        const db = await connectDB();

        // const collection = db.collection("users");

        const userData = await Media.findOne({ username: userId });

        if (!userData) return notFound();

        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">User Media: {userId}</h1>

                <div className="grid grid-cols-2 gap-4">
                    {userData.images?.map((img, idx) => (
                        <img key={idx} src={img} alt={`Image ${idx}`} className="rounded-lg shadow-md w-full h-auto" />
                    ))}
                    {userData.videos?.map((vid, idx) => (
                        <video key={idx} controls className="rounded-lg shadow-md w-full">
                            <source src={vid} type="video/mp4" />
                        </video>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error("Fetching User Data Error:", error);
        return notFound();
    }
}
