import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPaginatedData } from "../../_helpers";

export async function GET(req: NextRequest, { params }) {
    try {
        const query = await req.nextUrl.searchParams;
        const page = parseInt(query.get("page") ?? "1");
        const count = parseInt(query.get("count") ?? "9"); // Default: Return 9 entries
        const { categoryId } = await params;

        const dbData = await prisma.blog.findMany({
            where: { categoryId },
            include: { category: true } 
        });
        const totalCount = dbData.length;
        const result = getPaginatedData({
            data: dbData,
            page,
            countPerPage: count
        });

        return NextResponse.json({
            success: true,
            result: {
                page,
                total: totalCount,
                data: result
            }
        });
    }catch(e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}