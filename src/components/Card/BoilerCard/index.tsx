"use client";
import Button from "@/components/Button";
import WhatsIncludedDialog from "@/components/Dialog/SideSheets/WhatsIncluded";
import Image from "@/components/Image";
import Icon, { ICONS } from "@/components/Image/Icons";
import { LOGOS } from "@/lib/_imageMap";
import Link from "next/link";
import styles from './style.module.scss';
import PriceBox from "../PriceBox";
import Tag from "@/components/Tag";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import { trackEvent } from "@/lib/analytics";

const TAG_LABELS: Record<string, string> = {
    POPULAR: "Popular"
};

export default function BoilerCard({ item }) {
    const [isHover, setIsHover] = useState(false);
    const { isMobile } = useMediaQueries();
    const cardRef = useRef<HTMLElement>(null);

    const onMouseEnter = useCallback(() => {
        if (!isMobile) setIsHover(true);
    }, [isMobile]);
    const onMouseLeave = useCallback(() => {
        if (!isMobile) setIsHover(false);
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile || !cardRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => setIsHover(entry.isIntersecting),
            { threshold: 0.5 }
        );
        observer.observe(cardRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    return (
        <article ref={cardRef} className={styles.card} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className={styles.banner}>
                {item.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {item.tags.map((tag) => (
                            <Tag  tagType={tag ? tag.toString().toLowerCase(): "" } key={tag}>{TAG_LABELS[tag] ?? tag}</Tag>
                        ))}
                    </div>
                )}
                <div className={styles.imagesAnimationContainer}>
                    <div className={styles.imagesAnimation}>
                        <Image
                            type="product"
                            className={classNames(styles.imageContainer, {
                                [styles.slideInRight]: isHover,
                                [styles.hidden]: !isHover,
                            })}
                            src={item.productImage} alt={item.model}
                        />
                        <Image
                            type="product"
                            className={classNames(styles.imageContainer, { [styles.hover]: isHover })}
                            src={item.productImage} alt={item.model}
                        />
                        <Image
                            type="product"
                            className={classNames(styles.imageContainer, {
                                [styles.slideInLeft]: isHover,
                                [styles.hidden]: !isHover,
                            })}
                            src={item.productImage} alt={item.model}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.metadata}>
                <div className={styles.brandContainer}>
                    {item.brand && <Image type="brand" src={LOGOS[item.brand.toUpperCase()]} alt={item.brand} />}
                </div>
                <h3 className={styles.name}> {item.model}</h3>
                <ul className={styles.benefits}>
                    {
                        item.specs && item.specs.map((spec) => {
                            return (
                                <li key={`${item.model}-${spec}`}>
                                    <Icon icon={ICONS.CHECK_MARK_FILLED} />
                                    <span className={styles.ellipsis}>{spec}</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <p className={styles.note}> {item.note} </p>
                <div className={styles.spacer} />
                <PriceBox product={item} price={item.priceWithVat} />
                <WhatsIncludedDialog triggerClassName={styles.whatsIncludedTrigger} productType={item.productType} />
                <Link
                    href={`/quote/${item.productType}`}
                    onClick={() => trackEvent('product_card_click', { product: item.model, product_type: item.productType })}
                >
                    <Button className={styles.button}>
                        <span>Get your fixed price here</span>
                        <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </Link>
            </div>
        </article>
    );
}
