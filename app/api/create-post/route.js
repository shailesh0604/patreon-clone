import Posts from "@/models/Post";
import ConnectDB from "@/db/ConnectDB";
import { generateUniquePostId } from "@/lib/generateUniquePostId";
import { auth } from '@/lib/auth'


export async function POST(req) {
    await ConnectDB();

    const session = await auth();
    const username = session?.user?.patreon_account_username;

    const postId = await generateUniquePostId();

    const draft = new Posts({
        postId,
        username,
        title: "",
        content: "",
        media: "",
        status: "draft"
    });

    await draft.save();

    return Response.json({ postId });

}