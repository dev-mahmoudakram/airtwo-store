import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth: unknown }) => {
    const isLoggedIn = !!req.auth;
    const isAdminPath = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (isAdminPath && !isLoginPage && !isLoggedIn) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
    }
});

export const config = {
    matcher: ["/admin/:path*"],
};
