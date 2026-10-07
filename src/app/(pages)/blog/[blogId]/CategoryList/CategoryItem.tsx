import Link from "next/link";
import styles from "./style.module.scss";

export default function CategoryItem ({ category, postCount }) {
    return (
        <li>
            <Link href={`/blogs`} className={styles.categoryItem}>
                <span className={styles.label}>{category.label}</span>
                <span className={styles.count}> {`(${postCount})`}</span>
            </Link>
        </li>
    );

}