import Posts from "@/models/Post";

export async function generateUniquePostId() {
    let postId;
    let exists = true;

    while (exists) {
        // Generate random 9-digit number
        postId = Math.floor(100000000 + Math.random() * 900000000);

        // Check if postId already exists in the DB
        exists = await Posts.exists({ postId })
    }

    return postId;
}