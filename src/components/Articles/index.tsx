import Button from "@/components/Button";
import styles from "./style.module.scss";
import Link from "next/link";
import { PATH_QUOTE_BOILER_SERVICE } from "@/lib/_pathMap";
import Icon, { ICONS } from "@/components/Image/Icons";

type TArticles = {
    items: React.ReactNode[];
    sectionName?: {
        title: string;
        subHeading?: string;
    };
    ctaText?: string;
    className?: string;
};

export default function Articles({ items, sectionName, ctaText, className }: TArticles) {
    return (
        <section className={`${styles.articles} ${className ?? ""}`}>
            {sectionName && (
                <>
                    <h2 className={styles.title}>{sectionName.title}</h2>
                    {sectionName.subHeading && (
                        <p className={styles.subHeading}>{sectionName.subHeading}</p>
                    )}
                </>
            )}
            <div className={styles.grid}>
                {items.map((item, i) => (
                    <div key={`${sectionName}-art-${i}`}>{item}</div>
                ))}
            </div>
            {ctaText && (
                <Link href={PATH_QUOTE_BOILER_SERVICE}>
                    <Button className={styles.ctaButton}>{ctaText} <Icon icon={ICONS.ARROW_RIGHT} /></Button>
                </Link>
            )}
        </section>
    );
}
