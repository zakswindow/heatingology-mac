import { prisma } from "@/lib/prisma";
import { pseudoRandomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

type TPrismaConnection = { id: string; }


export async function GET (req: NextRequest, { params }) {
    try {
        const { quoteId } = await params;

        if (!quoteId) {
            throw new Error("Invalid Quote ID.");
        }

        const result = await prisma.quote.findUnique({
            where: { id: quoteId },
            include: { products: true } 
        });
        // TODO: Do we need to JSON.parse() content?
        return NextResponse.json({
            success: true,
            result
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 500 });
    }
}

export async function PUT (req: NextRequest, { params }) {
    try {
        const body = await req.json();
        const { quoteId } = await params;
        const { products = [], ...putBody } = body;
        const connect: TPrismaConnection[] = [];
        const disconnect: TPrismaConnection[] = [];

        if (products.length > 0) {
            products.forEach((item) => {
                if (item.action === "add") {
                    connect.push({ id: item.product.id });
                } else if (item.action === "remove") {
                    disconnect.push({ id: item.product.id });
                }
            });
        }

        if (!quoteId) {
            throw new Error("Invalid ID.");
        }

        const result = await prisma.quote.update({
            data: {
                ...putBody,
                products: {
                    connect,
                    disconnect 
                }
            },
            where: { id: quoteId }
        });
        return NextResponse.json({
            success: true,
            result
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}