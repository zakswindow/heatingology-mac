import BlogCard from "@/components/Card/BlogCard";
// import { blogs } from "../config";
import styles from "./style.module.scss";
import PageCounter from "../PageCounter";
import { useGetBlogsByCategory } from "@/lib/_queries/blogs.query";
import Loading from "@/app/loading";
import { useCallback, useState } from "react";

export default function Articles ({ category }) {
    const  MAX_ARTICLES_PER_PAGE = 9;
    const [curPage, setCurPage] = useState(1);
    const { data: blogData, isLoading: isBlogsLoading, isError: isBlogsError } = useGetBlogsByCategory({
        page: curPage,
        category,
        count:MAX_ARTICLES_PER_PAGE 
    });

    const onPageChange = useCallback((value: number) => {
        setCurPage(value);
    }, []);

    if (isBlogsLoading) {
        return <Loading />;

    }
    
    if (isBlogsError) {
        throw new Error("Fail to load Blog Articles.");
    }

    if (blogData?.success) {
        const { result: { data: blogs, total = 0 } } = blogData;

        const totalPages = Math.ceil(total / MAX_ARTICLES_PER_PAGE);

        return (
            <>
                <section className={styles.articles}>
                    {
                        blogs.slice(0, MAX_ARTICLES_PER_PAGE).map((item) => {
                            return (<BlogCard {...item} key={item.id} />);
                        })
                    }
                </section>
                {
                    totalPages > 1 &&
                        <PageCounter totalPages={totalPages} onChange={onPageChange} />
                }
            </>
        );
    }

    throw new Error("Fail to load Blog Articles.");
}