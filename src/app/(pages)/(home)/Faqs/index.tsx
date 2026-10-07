'use client';

import { FAQS } from "@/app/(pages)/faqs/_config";
import styles from './style.module.scss';
import Faqs from "@/components/Section/Faqs";

export default function HomeFaqs () {
    return (
        <Faqs faqs={FAQS.slice(0, 5)} className={styles.faqs} />
    );
}