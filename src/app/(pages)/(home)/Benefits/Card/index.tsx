"use client";
import styles from './style.module.scss';
import { TCommitment } from '../config';
import Animation from '@/components/Animation';

type TCommitmentCard = { item: TCommitment; isInView: boolean; }

export default function BenefitCard ({ item, isInView }: TCommitmentCard) {
    return (
        <article className={styles.card}>
            {
                item.icon &&
                <div className={styles.iconContainer}>
                    <Animation src={item.icon} autoplay={false} startPlay={isInView} />
                    {/* <Image src={item.icon} alt={item.headline} fill sizes='100%' />  */}
                </div>
            }
            <h3 className={styles.headline}> { item.headline }</h3>
            <p className={styles.content}> { item.content }</p>
        </article>
    );
}