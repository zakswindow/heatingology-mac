import { groupData } from "@/lib/_parser";
import { prisma } from "@/lib/prisma";
import { QALIFICATION_CATEGORY, QUALIFICATION_CATEGORY } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type TQualification = {
    id: number;
    name: string;
    category: QALIFICATION_CATEGORY | null;
    subCategory: string | null
};

export type TGetQualificationResponse = Record<
    QALIFICATION_CATEGORY,
    Record<string, TQualification[]>
>


export async function GET() {
    try {
        const dbData = await prisma.qualification.findMany({});
        const categoriesData = await prisma.qualificationCategory.findMany({});

        const qualifications = dbData.reduce((result, item) => {
            const { categoryId } = item;

            if (!result[categoryId]) {
                result[categoryId] = [];
            };

            result[categoryId].push(item);
            return result;
        }, {} as Record<QALIFICATION_CATEGORY, TQualification[]>);


        const categories = categoriesData.reduce((result, item) => {
            result[item.categoryId] = item.label;
            return result;
        }, {} as Record<QUALIFICATION_CATEGORY, string>);


        const result = Object.keys(qualifications).map((key) => {
            const subCategoryQualifications = groupData(qualifications[key], "subCategory");
            return {
                title: categories[key],
                qualifications: subCategoryQualifications
            };
        });

        return NextResponse.json({
            success: true,
            result 
        });
    }catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}

type TPostBody = {
    name: string;
    category?: QALIFICATION_CATEGORY | null;
    subCategory?: string | null;
}

export async function POST(req: NextRequest) {

    const body: TPostBody = await req.json();

    const categoryMap = {
        'GAS_SAFE': QALIFICATION_CATEGORY.GAS_SAFE,
        'INSTALL_ABILITIES': QALIFICATION_CATEGORY.INSTALL_ABILITIES,
        'TECHNICAL_ABILITIES': QALIFICATION_CATEGORY.TECHNICAL_ABILITIES
    };

    const data: TPostBody = { 
        name: body.name,
        category: categoryMap[body.category!] || null,
        subCategory: body.subCategory || null 
    };

    try {
        await prisma.qualification.create({ data });
        return NextResponse.json({ success: true }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const id = params.get("id");
    
    try {
        if (!id || !parseInt(id)) {
            throw new Error("Invalid ID.");
        }
        await prisma.qualification.delete({ where: { id: parseInt(id) } });
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: (e as Error).message }, { status: 400 });
    }
}