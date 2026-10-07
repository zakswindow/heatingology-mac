import Link from "next/link";
import styles from "./style.module.scss";
import Banner from "@/components/Image/Banner";
import Tag from "@/components/Tag";
import { BLOG_CATEGORIES_MAP } from "@/lib/_dataMap";
import { BLOG_CATEGORIES } from "@prisma/client";
import Image from "@/components/Image";

export default function PostItem ({ post }) {
    return (
        <article>
            <Link href={`/blog/${post.id}`} className={styles.postItem}>
                <figure className={styles.imageContainer}>
                    <Banner className={styles.image} bannerUrl={post.image} alt={post.title} />
                </figure>
                <div className={styles.content}>
                    <Image className={styles.thumbnail} src={"https://assets.heatingology.com/blogs/Signs-You-Need-a-New-Boiler.png"} alt={post.title} width={100} height={100} />
                    <div className={styles.metadata}>
                    <Tag
                        className={styles.tag}
                        tagType={BLOG_CATEGORIES_MAP[post.category.categoryId as BLOG_CATEGORIES]}
                    >{ post.category.label } </Tag>
                    <h2 className={styles.title}> { post.title } </h2>
                    </div>
                </div>
            </Link>
        </article>
    );
}