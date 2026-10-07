import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams;
        const productId = query.get("id");

        const result = await prisma.product.findUnique({ where: { id: productId } });

        return NextResponse.json({
            success: true,
            result 
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
        
    }
}