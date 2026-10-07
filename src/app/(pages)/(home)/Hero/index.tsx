"use client";

import Image from "next/image";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import { ProductType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const GOOGLE_REVIEW_LINK = `https://www.google.com/maps/place/Heatingology/@51.5820794,0.2238228,9z/data=!4m8!3m7!1s0xa5bd60678a8d4359:0x6a7cf6f6e76fbdca!8m2!3d51.5820794!4d0.2238228!9m1!1b1!16s%2Fg%2F11v5tmkz6y?entry=ttu&g_ep=EgoyMDI1MDkwOC4wIKXMDSoASAFQAw%3D%3D`;

export default function Hero () {
    const router = useRouter();
    const headline = "Warmth Begins Here.";
    const subHeadline = "Competitive fixed pricing, and us, who treat your home like our own.";
    const imageUrl = "https://assets.heatingology.com/landing-page/hero.jpg";
    const rating = process.env.NEXT_PUBLIC_REVIEW_RATING ?? "4.8";
    const reviewCount = Number(process.env.NEXT_PUBLIC_REVIEW_COUNT ?? 1229);
    const fillPercent = (parseFloat(rating) / 5) * 100;

    return (
        <section
            id="home-hero"
            className={styles.heroContainer} role="banner">
            <div className={styles.imageContainer}>
                <Image
                    className={styles.heroImage}
                    alt="featured"
                    fill
                    src={ imageUrl }
                    priority
                    sizes="100vw"
                />
                <div className={styles.overlay} />
            </div>
            <div
                className={styles.heroMetadata}>
                <div className={styles.spacer} />
                <h1 className={styles.heroHeadline}> { headline }</h1>
                <p className={styles.heroSubHeadline}> { subHeadline }</p>
                <Button className={styles.button} onClick={() => { trackEvent('cta_click', { label: 'hero_upgrade_boiler' }); router.push(`/quote/${ProductType.boiler}`); }}>
                    {`Upgrade My Boiler`}
                    <span className={styles.arrowContainer}>
                        <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                    </span>
                </Button>
                <div className={styles.spacer} />
                <footer className={styles.heroFooterNote}>
                    <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer">
                         {`Check out our ${reviewCount.toLocaleString()} reviews`}
                    </a>
                    <div className={styles.reviewRating}>
                        <span className={styles.ratingScore}>{rating}</span>
                        <div className={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <Icon key={i} className={styles.star} icon={ICONS.STAR} />
                            ))}
                            <div className={styles.starsFilled} style={{ width: `${fillPercent}%` }}>
                                {[...Array(5)].map((_, i) => (
                                    <Icon key={i} className={styles.star} icon={ICONS.STAR} />
                                ))}
                            </div>
                        </div>
                        <Icon className={styles.googleIcon} icon={ICONS.GOOGLE} />
                    </div>
                </footer>
            </div>
        </section>
    );
}
