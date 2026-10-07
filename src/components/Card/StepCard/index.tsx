import Image from "@/components/Image";
import styles from './style.module.scss';
import SequenceCard from "@/components/Section/HowItWorks/SequenceCard";

export default function StepCard({
    index,
    item
}: {
    index: number,
    item: {
        image: string,
        text: string,
        title: string
    }
}) {
    return (
        // <article className={styles.card}>
        //     <figure>
        //         <div className={styles.imageWrap}>
        //             <Image
        //                 className={styles.card_img}
        //                 src={item.image}
        //                 width={160}
        //                 height={160}
        //                 alt={item.image} />
        //         </div>
        //     </figure>
        //     <div className={styles.order}>
        //         <span>{ index }</span>
        //     </div>
        //     <p className={styles.title}>{item.title}</p>
        //     <p className={styles.text}>{item.text}</p>
        // </article>
        <SequenceCard item={item} />
    );
}