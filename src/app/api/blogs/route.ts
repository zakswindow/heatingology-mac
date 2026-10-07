import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const page = parseInt(params.get("page") ?? "1");
    const count = parseInt(params.get("count") ?? "9"); // Default: Resturn 9 entries


    try {
        const dbData = await prisma.blog.findMany({ include: { category: true } });
        const totalCount = dbData.length;
        let result = [];

        if (page > 0) {
            const start = (page - 1) * count;
            result = dbData.slice(start, start + count);
        } else {
            result = dbData.slice(0, count);
        }

        return NextResponse.json({
            success: true,
            result: {
                page,
                total: totalCount,
                data: result
            }
        });

    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}