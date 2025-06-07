// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Add routes you want to protect
const protectedRoutes = ["/home", "/notification", "/search", "/setting", "/create", "/c"];

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const isProtected = protectedRoutes.some((path) =>
        req.nextUrl.pathname.startsWith(path)
    );

    if (isProtected && !token) {
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/((?!_next|favicon.ico|logo|public|images|static|login|api/auth).*)",
    ],
};