'use client';

import { TFooterSection } from "../_config";
import FooterLink from "./link";
import styles from './style.module.scss';

type TSection = { data: TFooterSection; }

export default function FooterSection ({ data }: TSection) {
    if (!data) {
        return null;
    }

    return (
        <section
            className={styles.footerSection}>
            <strong> { data.title }</strong>
            <ul
                className={styles.footerSectionList}>
                {
                    data.pages.map((item) => {
                        return <li
                            key={item.title}>
                            <FooterLink
                                item={item} />
                        </li>;
                    })
                }
            </ul>
        </section>
    );
};