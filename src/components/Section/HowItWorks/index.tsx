'use client';
import SequenceCard from "./SequenceCard";
import styles from './style.module.scss';

export default function HowItWorks ({ data, title = "" }) {
    return (
        <section aria-label="How it works?" className={styles.section}>
            <h2 className={styles.title}> {title} </h2>
            <main className={styles.content}>
                {
                    data.map((item) => {
                        return <SequenceCard key={item.headline} item={item} />;
                    })
                }
            </main>
        </section>
    );
}