/**
 * Additive seed — adds new products and blogs without wiping existing data.
 *
 * Usage:
 *   yarn add:db
 *
 * 1. Create a new data file in prisma/seedData/ (model it on boilers.ts / blogs.ts).
 * 2. Import it below and spread it into the relevant array.
 * 3. Run: yarn add:db
 *
 * Products are skipped if brand + model already exist.
 * Blogs are skipped if title already exists.
 * BlogCategories are upserted (safe to re-run).
 */

import { PrismaClient, HtmlTag, BLOG_CATEGORIES, ProductType } from "@prisma/client";
import { getPriceWithVat } from "./seedData/_helper";

// ── Import your new data files here ──────────────────────────────────────────
// import { newBoilers } from "./seedData/newBoilers";
// import { newHeatPumps } from "./seedData/newHeatPumps";
// import { newBlogs, newBlogCategories } from "./seedData/newBlogs";
// ─────────────────────────────────────────────────────────────────────────────

const prisma = new PrismaClient();

// ── Types ─────────────────────────────────────────────────────────────────────

type TextEntry = {
    tag: HtmlTag;
    content: string;
};

type NewProduct = {
    brand: string;
    model: string;
    productType: ProductType;
    description: TextEntry[];
    price: number;
    hasVat?: boolean;
    [key: string]: unknown;
};

type NewBlog = {
    title: string;
    content: string;
    categoryId: BLOG_CATEGORIES;
    image?: string;
    readTime?: number;
    seoTItle?: string;
    metaDescription?: string;
};

type NewBlogCategory = {
    categoryId: BLOG_CATEGORIES;
    label: string;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

async function createProduct(item: NewProduct) {
    const { description, price, hasVat = true, ...rest } = item;

    const existing = await prisma.product.findFirst({
        where: { brand: item.brand, model: item.model },
    });

    if (existing) {
        console.log(`  skip (exists): ${item.brand} ${item.model}`);
        return;
    }

    await prisma.product.create({
        data: {
            ...rest,
            price,
            priceWithVat: getPriceWithVat(price, hasVat),
            hasVat,
            description: { create: description },
        },
    });
    console.log(`  created: ${item.brand} ${item.model}`);
}

async function createBlog(item: NewBlog) {
    const existing = await prisma.blog.findFirst({ where: { title: item.title } });

    if (existing) {
        console.log(`  skip (exists): "${item.title}"`);
        return;
    }

    await prisma.blog.create({ data: item });
    console.log(`  created: "${item.title}"`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
    console.log("Running additive seed…\n");

    // ── Products ────────────────────────────────────────────────────────────
    const newProducts: NewProduct[] = [
        // ...newBoilers,
        // ...newHeatPumps,
    ];

    if (newProducts.length > 0) {
        console.log(`Products: ${newProducts.length}`);
        for (const item of newProducts) {
            await createProduct(item);
        }
        console.log();
    }

    // ── Blog categories (upsert — safe to re-run) ───────────────────────────
    const newBlogCategories: NewBlogCategory[] = [
        // ...newBlogCategories,
    ];

    if (newBlogCategories.length > 0) {
        console.log(`Blog categories: ${newBlogCategories.length}`);
        for (const cat of newBlogCategories) {
            await prisma.blogCategory.upsert({
                where: { categoryId: cat.categoryId },
                update: { label: cat.label },
                create: cat,
            });
            console.log(`  upserted: ${cat.categoryId}`);
        }
        console.log();
    }

    // ── Blogs ───────────────────────────────────────────────────────────────
    const newBlogs: NewBlog[] = [
        // ...newBlogs,
    ];

    if (newBlogs.length > 0) {
        console.log(`Blogs: ${newBlogs.length}`);
        for (const blog of newBlogs) {
            await createBlog(blog);
        }
        console.log();
    }

    console.log("Done.");
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });
