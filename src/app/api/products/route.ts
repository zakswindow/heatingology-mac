import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreateProductSchema } from "./_parser/product";


export async function GET(req: NextRequest) {
    const query = await req.nextUrl.searchParams;
    const limit = parseInt(query.get("limit") ?? "0");

    try {
        const dbData = await prisma.product.findMany({
            orderBy: { price: 'asc' },
            include: {
                description: {
                    select: {
                        tag: true,
                        content: true 
                    } 
                }
            },
            ...(limit > 0 && { take: limit })

        });
        
        return NextResponse.json({
            success: true,
            result: dbData 
        });
    } catch (e) {
        return NextResponse.json({
            succss: false,
            error: (e as Error).message
        });
    }
}

export async function DELETE(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    
    try {
        if (!id) {
            throw new Error("Invalid ID.");
        }
        await prisma.product.delete({ where: { id } });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const productData = CreateProductSchema.safeParse(body);

        if (!productData.data) {
            throw new Error('Invalid data to create product record.');
        }

        const product = await prisma.product.create({ data: productData.data });
        return NextResponse.json({
            success: true,
            result: product
        }, { status: 201 });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 400 });
    }
}