import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { engineer, company, documents, qualifications, locations } = body;

        if (!engineer || !company || !documents || !qualifications || !locations) {
            throw new Error("Fail to get data to create egnieer record.");
        }

        const result = await prisma.$transaction(async (tx) => {
            const companyEntry = await tx.company.create({ data: company });

            const engineerEntry = await tx.engineer.create({
                data: {
                    ...engineer,
                    ...documents,
                    locations: locations,
                    companyId: companyEntry.id,
                    qualifications: { connect: qualifications.map(item => ({ id: item })) }
                },
                include: { company: true }
            });

            return {
                company: companyEntry,
                engineer: engineerEntry 
            };
        });
        return NextResponse.json({
            succss: true, 
            data: result
        }, { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ 
            success: false, 
            error: (e as Error).message 
        }, { status: 400 });
    }
}