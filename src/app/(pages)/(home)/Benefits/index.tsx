import BenefitCard from "./Card";
import { COMMITMENTS } from "./config";
import styles from './style.module.scss';

type TBenefits = {
    id: string;
    isInView: boolean;
}

export default function Benefits ({ id, isInView }: TBenefits) {
    return (
        <section aria-label="Why Customers Choose Us" className={styles.section} id={id}>
            <h2 className={styles.title}> The Heatingology Difference </h2>
            <main className={styles.cards}>
                {
                    COMMITMENTS.map((item) => {
                        return (
                            <BenefitCard key={item.headline} item={item} isInView={isInView} />
                        );
                    })
                }
            </main>
        </section>
    );
}