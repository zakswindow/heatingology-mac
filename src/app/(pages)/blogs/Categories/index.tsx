"use client";

import Button from "@/components/Button";
import { BLOG_TAGS } from "../config";
import styles from "./style.module.scss";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { useGetBlogCategories } from "@/lib/_queries/blogs.query";

export default function Categories ({ onSelect }) {
    const viewAllKey = "VIEW_ALL";
    const [selected, setSelected] = useState(viewAllKey);
    const { data: categoriesData, isLoading } = useGetBlogCategories();

    const onCategoryClick = useCallback((key: string) => () => {
        setSelected(key);
        onSelect(key);
    }, [onSelect]);

    if (isLoading) return null;

    const activeCategoryIds = new Set<string>(
        categoriesData?.result
            ?.filter((c: { count: number; categoryId: string }) => c.count > 0)
            .map((c: { count: number; categoryId: string }) => c.categoryId)
        ?? Object.keys(BLOG_TAGS)
    );

    const categories = Object.entries(BLOG_TAGS).filter(([key]) => activeCategoryIds.has(key));

    return (
        <nav className={styles.container}>
            {
                categories.map(([key, value]) => {
                    return <Button
                        key={key}
                        className={classNames(styles.category, { [styles.selected]: selected === key })}
                        variant="outline"
                        onClick={onCategoryClick(key)}
                    >
                        { value }
                    </Button>;
                })
            }
        </nav>
    );
}