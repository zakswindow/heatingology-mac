import FieldsetList from "@/components/Texts/FieldSetList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CategoryItem from "./CategoryItem";
import { BLOG_CATEGORIES } from "@prisma/client";
import styles from "./style.module.scss";

type TCategory = {
    id: number;
    label: string;
    categoryId: BLOG_CATEGORIES;

}

export default async function CategoryList () {
    const categories = await prisma.blogCategory.findMany({});
    
    return (
        <FieldsetList
            className={styles.categoryList}
            title="Categories"
            data={categories}
            listClassName={styles.list}
            renderComponent={async (item: TCategory) => {
                const postCount = await prisma.blog.count({ where: { categoryId: item.categoryId } });
                if (postCount > 0) {
                    return ( <CategoryItem category={item} postCount={postCount} />);
                }
                return null;
            }}
        />
    );
}