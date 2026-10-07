import { prisma } from "@/lib/prisma";
import { BoilerType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const boilerType = body.wantACombiBoiler ? BoilerType.COMBI : body.currentTypeOfBoiler;

        const dbData = await prisma.product.findMany({
            where: {
                boilerType,
                minBath: { lte: body.numOfBathrooms || 1 },
                maxBath: { gte: body.numOfBathrooms || 1 },
                minBed: { lte: body.numOfBedrooms || 1 },
                maxBed: { gte: body.numOfBedrooms || 1 }
            } 
        });
        return NextResponse.json({
            success: true,
            result: dbData
        });
    }catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}