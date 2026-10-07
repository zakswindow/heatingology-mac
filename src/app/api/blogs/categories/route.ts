import { prisma } from "@/lib/prisma";
import { BLOG_CATEGORIES } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const categories = await prisma.blogCategory.findMany({
            include: {
                _count: {
                    select: { Blog: true }
                }
            }
        });

        const totalBlogs = categories
            .filter(c => c.categoryId !== BLOG_CATEGORIES.VIEW_ALL)
            .reduce((sum, c) => sum + c._count.Blog, 0);

        const result = categories.map(c => ({
            categoryId: c.categoryId,
            label: c.label,
            count: c.categoryId === BLOG_CATEGORIES.VIEW_ALL ? totalBlogs : c._count.Blog
        }));

        return NextResponse.json({ success: true, result });
    } catch (e) {
        return NextResponse.json({ success: false, error: (e as Error).message });
    }
}
