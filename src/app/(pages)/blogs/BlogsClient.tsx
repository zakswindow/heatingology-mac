"use client";

import Articles from "./Articles";
import Categories from "./Categories";
import styles from "./style.module.scss";
import { useCallback, useState } from "react";
import { BLOG_CATEGORIES } from "@prisma/client";

export default function BlogsClient () {
    const [categoryId, setCategoryId] = useState<BLOG_CATEGORIES>(BLOG_CATEGORIES.VIEW_ALL);

    const onCategorySelect = useCallback((value: BLOG_CATEGORIES) => {
        setCategoryId(value);
    }, []);

    return (
        <main className={styles.page}>
            <h1 className={styles.title}> Advice </h1>
            <Categories onSelect={onCategorySelect} />
            <Articles category={categoryId} />
        </main>
    );
}
