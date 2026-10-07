import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET () {
    try {
        const result = await prisma.quote.findMany({ include: { products: true } });
        // TODO: Do we need to JSON.parse() content?
        return NextResponse.json({
            success: true,
            result
        });

    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 500 });
    }
}

export async function POST (req: NextRequest) {
    const body = await req.json();

    try {
        const products = body.products || {};
        const result = await prisma.quote.create({
            data: {
                content: JSON.stringify(body.content),
                productType: body.productType,
                postcode: body.postcode || "",
                products
            }
        });

        return NextResponse.json({
            success: true,
            result: {
                ...result,
                content: JSON.parse(result.content)
            }
        }, { status: 201 });
    }catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 500 });
    }
}

export async function DELETE (req: NextRequest) {
    try {
        await prisma.quote.deleteMany({});
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}