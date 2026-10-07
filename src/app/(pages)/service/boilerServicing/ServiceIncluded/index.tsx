"use client"
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from './style.module.scss';
import classNames from "classnames";
import { PATH_QUOTE_BOILER_SERVICE } from "@/lib/_pathMap";
import Link from "next/link";

export default function ServiceIncluded({
    title,
    description,
    pricing,
    serviceInfo,
    serviceIncludedSubtext
}: {
    title: string,
    description: string,
    pricing: {
        price: string,
        period: string,
        description: string,
        buttonText: string,
        buttonUrl: string,
        buttonSubtext: string
    },
    serviceInfo: {
        title: string,
        services: Array<string>
        featured?: boolean
    },
    serviceIncludedSubtext: string
}) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>

            <div className={styles.content}>
                <div className={styles.pricingSection}>
                    <div className={styles.pricingCard}>
                        <div className={styles.priceHeader}>
                            <span className={styles.currency}>£</span>
                            <span className={styles.amount}>{pricing.price}</span>
                            <span className={styles.period}>{pricing.period}</span>
                        </div>

                        <p className={styles.pricingDescription}>{pricing.description}</p>
                        <Link href={PATH_QUOTE_BOILER_SERVICE}>
                            <button className={styles.ctaButton}>
                                {pricing.buttonText}
                            </button>
                        </Link>

                        <div className={styles.ctaText}>
                            <a href={pricing.buttonUrl} className={styles.ctaLink}>
                                {pricing.buttonSubtext}
                            </a>
                        </div>
                    </div>
                </div>

                <div className={styles.serviceSection}>
                    <div className={styles.serviceCard} >
                        <h3 className={styles.serviceTitle}>{serviceInfo.title}</h3>
                        <ul className={styles.serviceList}>
                            {serviceInfo.services.map((service, index) => (
                                <li key={index} className={styles.serviceItem}>
                                    <Icon className={styles.icon} icon={ICONS.CHECK_MARK_FILLED} />
                                    <span>{service}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <p className={styles.subtext}>{serviceIncludedSubtext}</p>
        </div>
    );
};