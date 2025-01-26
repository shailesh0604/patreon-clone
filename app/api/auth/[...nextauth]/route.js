
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User"
import { connectDB } from "@/db/ConnectDB"

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "openid email profile",
                },
            },
        })
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                //connect to database
                await connectDB();

                //find the user is already in database or not
                const currentUser = await User.findOne({ email: user.email });

                const profilePic = account.provider === 'google' ? profile.picture : account.provider === "github" ? profile.avatar_url : null

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                        name: profile?.name || user.email.split("@")[0],
                        provider: account.provider,
                        profilepic: profilePic,
                    });

                    console.log("Account Provider:", account.provider);
                    await newUser.save();
                    user.name = newUser.username;
                }
                else {
                    if (currentUser.provider !== account.provider) {
                        currentUser.provider = account.provider;
                        await currentUser.save();
                    }
                    user.name = currentUser.username;
                }
                return true;

            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Deny sign-in on error }

            }
        }
    }
})

export { handler as GET, handler as POST }