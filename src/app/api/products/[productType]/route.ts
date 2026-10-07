import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }) {
    try {
        const { productType } = await params;
        const query = req.nextUrl.searchParams;
        const limit = parseInt(query.get("limit") ?? "0");
        const order = query.get("order") ?? "";
        const sort = query.get("sort") ?? "";
        const models = query.getAll("model") ?? [];
        let modelClause = {};

        if (order && (order !== 'asc' && order !== 'desc')) {
            throw new Error("Fail: Incorrect sorting order.");
        }


        if (models && models.length > 0) {
            if (models.length === 1) {
                modelClause = { model: models[0] };
            } else {
                modelClause = {
                    OR: models.map((item) => {
                        return { model: item };
                    })
                };
            }
        }

        const dbData = await prisma.product.findMany({
            include: { description: true },
            where: {
                productType,
                ...modelClause
            },
            ...(limit > 0 && { take: limit }),
            ...((sort && order) && { orderBy: { [sort]: order } })
        });

        const INSTALL_TIME_ORDER: Record<string, number> = { Morning: 0, Afternoon: 1, Evening: 2 };
        const getInstallRank = (model: string) => {
            const key = Object.keys(INSTALL_TIME_ORDER).find((k) => model.includes(k));
            return key !== undefined ? INSTALL_TIME_ORDER[key] : 99;
        };
        const result = productType === "install_time"
            ? [...dbData].sort((a, b) => getInstallRank(a.model) - getInstallRank(b.model))
            : dbData;

        return NextResponse.json({
            success: true,
            result
        });
    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Erorr).message
        });
    }
}