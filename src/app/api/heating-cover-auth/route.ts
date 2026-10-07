import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "heatassure_auth";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
    const { password, from } = await req.json();

    if (password !== process.env.HEATASSURE_PASSWORD) {
        return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const redirectTo = (from as string) || "/heating-cover";
    const res = NextResponse.json({ ok: true, redirectTo });

    res.cookies.set(COOKIE_NAME, password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    });

    return res;
}
