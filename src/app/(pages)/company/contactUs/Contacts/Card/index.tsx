import Banner from "@/components/Image/Banner";
import styles from "./style.module.scss";

export default function ContactCard ({ iconUrl, headline, subHeadline, children }) {
    return (
        <article className={styles.card}>
            <figure className={styles.icon}>
                <Banner bannerUrl={iconUrl} alt={headline} />
            </figure>
            <h3 className={styles.headline}> { headline }</h3>
            <p className={styles.subHeadline}> { subHeadline }</p>
            {
                children
            }
        </article>
    );
}