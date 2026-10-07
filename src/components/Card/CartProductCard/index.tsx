import Image from "@/components/Image";
import styles from "./style.module.scss";

type TCartProductCard = {
    className?: string;
    headline: string;
    description?: string;
    imageUrl?: string;
}

export default function CartProductCard ({ headline, description, imageUrl }: TCartProductCard) {
    return (
        <article className={styles.card}>
            {
                imageUrl &&
                    <figure className={styles.image}>
                        <Image src={imageUrl} width={60} height={60} alt={headline} />
                    </figure>
            }
            
            <span className={styles.details}>
                <h5 className={styles.headline}> { headline } </h5>
                <p className={styles.description}> { description } </p>
            </span>
        </article>
    );
}