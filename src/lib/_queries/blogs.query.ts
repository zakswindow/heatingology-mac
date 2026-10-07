import { BLOG_CATEGORIES } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function getAllBlogs ({ page = 0, count = 9 }) {
    try {
        const url = getUrl(`/blogs?page=${page}&count=${count}`);

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to get screen");
        }
        return await response.json();

    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useGetAllBlogs ({ page = 1, count = 9 }) {
    return useQuery({
        queryKey: ["getAllBlogs", page, count],
        queryFn: async () => getAllBlogs({
            page,
            count 
        })
    });
}

async function getBlogsByCategory ({ page = 0, count = 9, category = BLOG_CATEGORIES.VIEW_ALL }: {
    page?: number;
    count?: number;
    category: BLOG_CATEGORIES;
}) {
    try {
        const categoryParam = category === BLOG_CATEGORIES.VIEW_ALL ? "" : `/${category}`;
        const url = getUrl(`/blogs${categoryParam}?page=${page}&count=${count}`);

        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to get blogs content.");
        }
        return await response.json();

    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

async function getBlogCategories () {
    try {
        const url = getUrl('/blogs/categories');
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) throw new Error("Failed to get blog categories.");
        return await response.json();
    } catch (e) {
        return { success: false, error: (e as Error).message };
    }
}

export function useGetBlogCategories () {
    return useQuery({
        queryKey: ["getBlogCategories"],
        queryFn: getBlogCategories
    });
}

export function useGetBlogsByCategory ({ page = 1, count = 9, category = BLOG_CATEGORIES.VIEW_ALL }: {
    page?: number;
    count?: number;
    category?: BLOG_CATEGORIES
}) {
    return useQuery({
        queryKey: ["getBlogsByCategory", page, count, category],
        queryFn: async () => getBlogsByCategory({
            page,
            count,
            category
        }),
        enabled: Boolean(category)
    });
}