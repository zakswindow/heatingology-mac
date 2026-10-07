"use client";
import { useEffect, useRef, useState } from 'react';
import ServiceCard from './Card';
import { SERVICES } from './config';
import styles from './style.module.scss';
import classNames from 'classnames';

type TServices = {
    id: string;
}

export default function Services ({ id }: TServices) {
    const FEATURED_ROW_COUNT = 3;
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} aria-label="Our Services" className={classNames(styles.section, { [styles.visible]: isVisible })} id={id}>
            <section className={styles.featured} aria-label="Featured Services">
                <ServiceCard isFeatured item={SERVICES[0]} />
                {
                    SERVICES.slice(1, FEATURED_ROW_COUNT).map((item) => {
                        return (
                            <ServiceCard key={item.headline} item={item} />
                        );
                    })
                }
            </section>
            <section aria-label="Our Services" className={styles.others}>
                {
                    SERVICES.slice(FEATURED_ROW_COUNT).map((item) => {
                        return (
                            <ServiceCard key={item.headline} item={item} orientation="landscape" />
                        );
                    })
                }
            </section>
        </section>
    );
}