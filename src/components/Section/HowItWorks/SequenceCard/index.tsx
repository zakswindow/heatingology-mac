'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from '@/components/Image';
import styles from './styles.module.scss';

type TCardItem = {
    order: number;
    headline: string;
    content: string;
    banner: string;
}

type TSequenceCard = { item: TCardItem; }

export default function SequenceCard ({ item }: TSequenceCard) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' });

    return (
        <motion.article
            ref={ref}
            className={styles.card}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ opacity: 0 }}
        >
            {
                item.banner && <Image
                    className={styles.banner}
                    src={item.banner}
                    alt={item.headline}
                    fill
                    sizes="100%% 100%" />
            }
            <div className={styles.order}>
                <span>{ item.order }</span>
            </div>
            <h3 className={styles.headline}> { item.headline} </h3>
            <p className={styles.content}> { item.content } </p>
        </motion.article>
    );
}
