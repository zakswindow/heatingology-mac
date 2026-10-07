import { prisma } from "@/lib/prisma";
import { BLOG_CATEGORIES } from "@prisma/client";
import BlogCard from "@/components/Card/BlogCard";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./style.module.scss";
import { PATH_ADVICE, PATH_ADVICEE } from "@/lib/_pathMap";

const DEFAULT_COUNT = 3;

export default async function RelatedPosts ({
    currentBlogId,
    categoryId,
    count = DEFAULT_COUNT,
}: {
    currentBlogId: string;
    categoryId: BLOG_CATEGORIES;
    count?: number;
}) {
    const posts = await prisma.blog.findMany({
        where: {
            id: { not: currentBlogId },
            categoryId,
        },
        orderBy: [
            { createdAt: "desc" },
        ],
        take: count,
        include: { category: true },
    });

    if (!posts.length) return null;

    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Related Posts</h2>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <BlogCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        category={post.category}
                        readTime={post.readTime ?? 0}
                        image={post.image}
                    />
                ))}
            </div>
            <Link href={PATH_ADVICE} className={styles.viewAll}>
                <Button variant="outline">View All</Button>
            </Link>
        </section>
    );
}
