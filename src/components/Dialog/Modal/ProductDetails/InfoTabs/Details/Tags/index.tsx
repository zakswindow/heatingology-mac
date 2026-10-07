import Tag from "@/components/Tag";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function Tags () {
    return (
        <section className={styles.tags}>
            <Tag className={`${styles.tag} ${styles.inStock}`}> 
                <Icon icon={ICONS.IN_STOCK} />
                {`In stock for installation in RM10`}
            </Tag>
            <Tag className={`${styles.tag} ${styles.instalment}`}>
                <Icon icon={ICONS.DISCOUNT} />
                {`Low monthly payments available`}
            </Tag>
        </section>
    );
}