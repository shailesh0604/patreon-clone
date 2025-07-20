import { NextResponse } from "next/server";
import cloudinary from "@/Components/Cloudinary";
import ConnectDB from "@/db/ConnectDB";
import User from "@/models/User";
import { auth } from "@/lib/auth";

// ✅ Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function uploadToCloudinary(file) {

    if (!(file instanceof File)) {
        console.error("Not a valid file:", file);
        throw new Error("Invalid file upload");
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', folder: "profile" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error);
                }
                console.log("Cloudinary upload success:", result);
                resolve(result);
            }
        );
        uploadStream.end(buffer); // triggers the upload
    });
}

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


        // New: fallback URLs from client
        const profileImageUrl = formData.get("profileImageUrl");
        const coverImageUrl = formData.get("coverImageUrl");

        // console.log({ headline, coverFile });

        let profileUrl = null;
        let coverUrl = null;


        if (profileFile && typeof profileFile.arrayBuffer === "function") {
            const result = await uploadToCloudinary(profileFile, "users/profile");
            profileUrl = result.secure_url;
            // console.log("profile result : ", result)

        } else if (profileImageUrl) {
            profileUrl = profileImageUrl;
        }

        if (coverFile && typeof coverFile.arrayBuffer === "function") {
            const result = await uploadToCloudinary(coverFile, "users/cover");
            coverUrl = result.secure_url;
        }
        else if (coverImageUrl) {
            coverUrl = coverImageUrl;
        }
        
        const updatedUser = await User.findOneAndUpdate({ email: userEmail }, {
            patreon_account_name: name,
            patreon_account_profilepic: profileUrl,
            patreon_account_coverpic: coverUrl,
            patreon_account_username_headline: headline,
            patreon_account_published: true,
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