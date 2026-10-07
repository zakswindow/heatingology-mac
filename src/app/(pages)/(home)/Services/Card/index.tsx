"use client";
import styles from './style.module.scss';
import { TService } from "../config";
import classNames from "classnames";
import Link from "next/link";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import { ANIMATIONS, QUESTIONNAIRE_ANIMATIONS } from "@/lib/_imageMap";
import Animation from "@/components/Animation";
import CardBanner from "./Banner";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMediaQueries } from '@/lib/_contexts/_mediaQuery';
import { trackEvent } from "@/lib/analytics";

type TServiceCard = {
    item: TService;
    orientation?: "portrait" | "landscape";
    isFeatured?: boolean;
    isInView?: boolean;
}

export default function ServiceCard ({ item, orientation = "portrait", isFeatured }: TServiceCard) {
    const [isHover, setIsHover] = useState(false);
    const { isMobile, isDesktop } = useMediaQueries();
    const [ animationScale, setAnimationScale ] = useState(1);
    const [animationSrc, setAnimationSrc] = useState<string>("");
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
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

    useEffect(() => {
        if (!hasAutoPlayed) {
            setHasAutoPlayed(true);
        }
    }, [hasAutoPlayed]);

    useEffect(() => {
        if (isMobile) {
            setAnimationScale(1);
            setAnimationSrc(QUESTIONNAIRE_ANIMATIONS.ONBOARDING_MOBILE);
        } else if (isDesktop) {
            setAnimationScale(1.4);
            setAnimationSrc(ANIMATIONS.PRODUCT_CARD);
        }
    }, [isMobile, isDesktop]);

    return (
        <article ref={cardRef} className={classNames(styles.card, styles[orientation], { [styles.featured]: isFeatured })} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className={styles.banner}>
                {
                    isFeatured &&
                        <Animation className={styles.bannerAnimation} src={animationSrc} scale={animationScale} autoplay={!hasAutoPlayed} playOnHover={isHover} stopOnLeave={!isHover} />
                }
                <CardBanner product={item} isFeatured={isFeatured} isHover={isHover} orientation={orientation} />
            </div>
            <section className={styles.description}>
                {/* <span className={styles.category}> { item.category } </span> */}
                <h3 className={styles.headline}> { item.headline }</h3>
                <p className={styles.content}> { item.content }</p>
                <div className={styles.spacer} />
                <Link href={`/quote/${item.productType}`} onClick={() => trackEvent('service_card_click', { service: item.productType })}>
                    <Button className={styles.button}>
                        <span>{item.ctaLabel ?? "Get your fixed price"}</span>
                        <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </Link>
            </section>
        </article>
    );
}