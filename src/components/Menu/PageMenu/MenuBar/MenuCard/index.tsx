import Link from "next/link";
import styles from "./style.module.scss";
import Banner from "@/components/Image/Banner";
import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";
import Image from "@/components/Image";

export default function MenuCard ({ label, description, image, location, onClick = undefined }) {
    return (
        <Link href={location ?? "#"} onClick={onClick}>
            <article className={ classNames(styles.card, { [styles.featured]: Boolean(image) })}>
                {
                    image &&
                        <Image src={image} alt={label} width={296} height={196} className={styles.imageContainer} />
                }
                <div className={styles.texts}>
                    <h2 className={styles.label}>{ label }</h2>
                    <div className={styles.descriptionContainer}>
                        <p className={styles.description}>{ description }</p>
                        <span className={styles.iconContainer}><Icon icon={ICONS.ARROW_RIGHT} className={styles.icon} /></span>
                    </div>
                </div>
            </article>
        </Link>
    );
}