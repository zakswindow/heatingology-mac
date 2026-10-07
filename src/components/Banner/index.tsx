"use client";
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './style.module.scss';
import classNames from 'classnames';
import Icon, { ICONS } from '../Image/Icons';
import { trackEvent } from '@/lib/analytics';

export default function Banner({
    bannerImage,
    title,
    features = [],
    buttonText,
    buttonUrl,
    bannerPosition = 'center'
}: {
    bannerImage: string,
    title: string,
    features: Array<string>,
    buttonText: React.ReactNode,
    buttonUrl: string,
    bannerPosition?: 'top' | 'center'
}) {
    return (
        <div className={styles.banner}>
            <div className={styles.imageContainer}>
                <Image
                    src={bannerImage}
                    alt="Banner Image"
                    fill
                    className={classNames(styles.backgroundImage, styles[bannerPosition])}
                    priority
                />
            </div>
            <div className={styles.overlay} />
            <div className={styles.content}>
                <div className={styles.contentWrapper}>
                    <h2 className={styles.title}>
                        {title}
                    </h2>

                    <div className={styles.featuresList}>
                        {features.map((feature, index) => (
                            <div key={index} className={styles.featureItem}>
                                <div className={styles.checkContainer}>
                                    <Check className={styles.checkIcon} strokeWidth={3} />
                                </div>
                                <span className={styles.featureText}>
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={buttonUrl}
                        onClick={() => trackEvent('cta_click', { label: 'service_banner', destination: buttonUrl })}
                    >
                        <Button className={styles.ctaButton}>
                            {buttonText}
                            <Icon icon={ICONS.ARROW_RIGHT} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};