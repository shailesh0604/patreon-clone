import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import ConnectDB from "@/db/ConnectDB";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
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
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Add user data to the token during sign-in
            if (user) {
                token.email = user.email;
            }

            try {
                await ConnectDB();

                const dbUser = await User.findOne({ email: token.email });

                if (dbUser) {
                    token.name = dbUser.name;
                    token.profilePic = dbUser.profilePicture;
                }
            } catch (error) { console.error("Error fetching user from DB:", error); }


            return token;
        },
        async session({ session, token }) {
            // Add token data to the session
            if (session.user) {
                session.user.name = token.name;
                //console.log("user name : ", session.user.name);
                session.user.profilepic = token.profilepic;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                // Connect to the database
                await ConnectDB();

                // Find the user in the database
                const currentUser = await User.findOne({ email: user.email });

                // Handle profile picture
                const profilePic = profile?.picture || profile?.avatar_url || null;

                if (!currentUser) {
                    // Create a new user if they don't exist
                    const newUser = new User({
                        email: user?.email,
                        username: "",
                        name: user?.name || user?.email?.split("@")[0],
                        provider: account.provider,
                        profilepic: profilePic,
                    });

                    await newUser.save();
                    user.name = newUser.username;
                    user.profilepic = newUser.profilepic;
                } else {
                    // Update the provider if it has changed
                    if (currentUser.provider !== account.provider) {
                        currentUser.provider = account.provider;
                        await currentUser.save();
                    }
                    user.name = currentUser.username;
                    user.profilepic = currentUser.profilepic;
                }

                return true; //allow sign in

            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false; // Deny sign-in on error
            }
        },
        async redirect({ url, baseUrl }) {
            // If the url is on the same origin
            if (url.startsWith(baseUrl)) {
                // If redirecting after logout (signout), send to '/'
                if (url.includes('/api/auth/signout')) {
                    return '/';
                }
                // For all other redirects, send to /home
                return `${baseUrl}/home`;
            }

            // For external URLs (if any), allow redirect as-is
            return url;
        }


    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };