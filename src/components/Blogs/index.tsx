'use client';

import styles from './style.module.scss';
import BlogCard from '@/components/Card/BlogCard';
import Button from '@/components/Button';
import Link from 'next/link';
import { useGetBlogsByCategory } from '@/lib/_queries/blogs.query';
import Loading from '@/app/loading';
import { BLOG_CATEGORIES } from '@prisma/client';
import CardScrollableContainer from '@/components/CardScrollableContainer';
import { useMediaQueries } from '@/lib/_contexts/_mediaQuery';


type TBlogs = {
    title?: string;
    category?: BLOG_CATEGORIES;
    className?: string;
}

export default function Blogs ({ title = "", category = BLOG_CATEGORIES.VIEW_ALL }: TBlogs) {
    const MAX_BLOGS = 3;
    const { isMobile } = useMediaQueries();
    const { data: blogsData, isLoading: isBlogsLoading, isError: isBlogError } = useGetBlogsByCategory({ category, count: MAX_BLOGS });

    if (isBlogsLoading) {
        return <Loading />;
    }

    if (isBlogError) {
        return null;
    }

    if (blogsData?.result) {
        try {
            const { result: { data: blogs } } = blogsData;
            if (!blogs.length) return null;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const blogCards = blogs.map((item: any) => <BlogCard key={item.title} {...item} />);

            if (isMobile) {
                return (
                    <CardScrollableContainer
                        className={styles.mobileContainer}
                        sectionName={{ title }}
                        items={blogCards}
                        maxItems={blogCards.length}
                        showSeeMore={false}
                        keepHorizontal={true}
                        showScrollButtons={true}
                    />
                );
            }

            return (
                <section aria-label="Advices" className={styles.section}>
                    <h2 className={styles.title}> {title} </h2>
                    <nav className={styles.articles}>
                        {blogCards}
                    </nav>
                    <Link href="/blogs" className={styles.footer}>
                        <Button variant="outline"> View all </Button>
                    </Link>
                </section>
            );
        } catch (e) {
            console.error(e);
            return null;
        }
    }
    return null;
}
