import Link from "next/link";
import styles from "./style.module.scss";

type TBreadcrumbItem = {
    label: string;
    href?: string;
};

type TBreadcrumb = {
    items: TBreadcrumbItem[];
    className?: string;
};

export default function Breadcrumb({ items, className }: TBreadcrumb) {
    return (
        <nav aria-label="breadcrumb" className={className}>
            <ol className={styles.breadcrumb}>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label} className={styles.item}>
                            {!isLast && item.href ? (
                                <Link href={item.href} className={styles.link}>{item.label}</Link>
                            ) : (
                                <span className={isLast ? styles.current : styles.link}>{item.label}</span>
                            )}
                            {!isLast && <span className={styles.separator} aria-hidden="true">›</span>}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
