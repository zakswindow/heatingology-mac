import { prisma } from "@/lib/prisma";
import styles from "./style.module.scss";
import BlogContent from "./Content";
import SocialMedia from "./SocialMedia";
import Tag from "@/components/Tag";
import Categories from "./CategoryList";
import PopularPosts from "./PopularPosts";
import RelatedPosts from "./RelatedPosts";
import { BLOG_CATEGORIES_MAP } from "@/lib/_dataMap";
import Icon, { ICONS } from "@/components/Image/Icons";
import { format } from "date-fns";
import { Metadata } from "next";
import { cache } from "react";
import Breadcrumb from "@/components/Breadcrumb";

const getBlog = cache((blogId: string) =>
    prisma.blog.findUnique({ where: { id: blogId }, include: { category: true } })
);

export async function generateMetadata ({ params }: { params: Promise<{ blogId: string }> }): Promise<Metadata> {
    const { blogId } = await params;
    const blog = await getBlog(blogId);
    if (!blog) return { title: "Article Not Found | Heatingology" };

    return {
        title: blog.metaTitle,
        description: blog.metaDescription,
        openGraph: {
            title: blog.metaTitle,
            description: blog.metaDescription,
            type: "article",
            publishedTime: blog.createdAt.toISOString()
        },
    };
}

export default async function BlogPost ({ params }: { params: Promise<{ blogId: string }> }) {
    const { blogId } = await params;
    const blog = await getBlog(blogId);

    if (!blog) {
        throw new Error("Something went wrong!");
    }

    // onst tagCss = classNames(getTagCss(category.categoryId), styles.tag);

    return (
        <main className={styles.page}>
            <Breadcrumb
                className={styles.breadcrumb}
                items={[
                    { label: "Home", href: "/" },
                    { label: "Advice", href: "/blogs" },
                    { label: blog.title },
                ]}
            />
            <Tag className={styles.tag} tagType={BLOG_CATEGORIES_MAP[blog.category.categoryId]} >{ blog.category.label }</Tag>
            <h1 className={styles.title}> { blog.title }</h1>
            <section className={styles.articleData}>
                <span className={styles.container}> 
                    <Icon icon={ICONS.CALENDAR_OUTLINE} />
                    { format(blog.createdAt, "do MMM, yyyy")}
                </span>
                {
                    blog.viewCount ?
                        <span className={styles.container}>
                            <Icon icon={ICONS.VIEW_COUNT} />
                            { blog.viewCount }
                        </span>
                        : null
                }
            </section>
            <section className={styles.content}>
                <section className={styles.article}>
                    <BlogContent content={blog.content} />
                    {/* <SocialMedia /> */}
                </section>
                <section className={styles.nav}>
                    <Categories />
                    <PopularPosts currentBlog={blogId}/>
                </section>
            </section>
            <RelatedPosts currentBlogId={blogId} categoryId={blog.categoryId} />
        </main>
    );

}