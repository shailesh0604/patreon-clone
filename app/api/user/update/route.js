import { NextResponse } from "next/server";
import cloudinary from "@/Components/Cloudinary";
import ConnectDB from "@/db/ConnectDB";
import User from "@/models/User";
import { auth } from "@/lib/auth";
import { uploadImageBuffer } from "@/lib/uploadImageBuffer";

// ✅ Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



export async function POST(req) {
    try {
        await ConnectDB();

        const session = await auth();
        const userEmail = session?.user?.email;

        if (!userEmail) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const name = formData.get("name");
        const headline = formData.get("headline");
        const profileFile = formData.get("profileImage");
        const coverFile = formData.get("coverImage");

        const profileUrl = await uploadImageBuffer(profileFile, "users/profile");
        const coverUrl = await uploadImageBuffer(coverFile, "users/cover");

        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, {
            patreaon_account_name: name,
            patreaon_account_profilepic: profileUrl,
            patreaon_account_coverpic: coverUrl,
            patreaon_account_username_headline: headline,
            patreaon_account_published: true,
        }, { new: true });

        if (!updatedUser) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: updatedUser });

    }
    catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

}