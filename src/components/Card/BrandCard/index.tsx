import Button from "@/components/Button";
import Image from "@/components/Image";
import Icon, { ICONS } from "@/components/Image/Icons";
import { LOGOS } from "@/lib/_imageMap";
import Link from "next/link";
import styles from './style.module.scss';

export default function BrandCard({ item }: {
    item: {
        brand: string,
        description: string,
        ctaUrl: string
        ctaLabel?: string
    }
}) {
    return (
        <article className={styles.card}>
            <div className={styles.contentTop}>
                <Image className={styles.brandImage} type="brand" src={LOGOS[item.brand.toUpperCase()]} alt={item.brand} />
                <p className={styles.description}>{item.description}</p>
            </div>
            <Link href={item.ctaUrl}>
                <Button className={styles.button}>
                    <span>{item.ctaLabel ?? "Get Your Fixed Price"}</span>
                    <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                </Button>
            </Link>
        </article>
    );
}