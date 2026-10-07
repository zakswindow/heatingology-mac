import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const dbData = await prisma.company.findMany({ 
        select: { 
            name: true, 
            address: true,
            type: true
        } 
    });
    return NextResponse.json({ data: dbData });
}