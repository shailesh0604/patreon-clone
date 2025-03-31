import { NextResponse } from "next/server";
import { connectDB } from "@/db/ConnectDB";
import Media from "@/models/UserMedia";
// import { v2 as cloudinary } from "cloudinary";
import cloudinary from "@/Components/Cloudinary";

// ✅ Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(req, res) {
    try {
        await connectDB();

        const formData = await req.formData();
        const file = formData.get('file');
        const userId = formData.get("userId");

        if (!file || !userId) {
            return NextResponse.json({ error: "File or User ID missing" }, { status: 400 });
        }

        // Convert File to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);



        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer)
        });

        const user = await Media.findOneAndUpdate(
            { username: userId },
            { $push: { images: uploadResult.secure_url } },
            { upsert: true, new: true }
        );

        return NextResponse.json({ url: uploadResult.secure_url, user }, { status: 200 });
    }
    catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}