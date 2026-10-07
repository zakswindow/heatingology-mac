import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "heatassure_auth";
const LOGIN_PATH = "/heating-cover-login";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (!pathname.startsWith("/heating-cover")) return NextResponse.next();

    if (pathname.startsWith(LOGIN_PATH)) return NextResponse.next();

    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token === process.env.HEATASSURE_PASSWORD) return NextResponse.next();

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = LOGIN_PATH;
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/heating-cover/:path*", "/heating-cover-login"],
};
