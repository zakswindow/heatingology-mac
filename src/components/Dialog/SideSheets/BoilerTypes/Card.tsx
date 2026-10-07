import Banner from "@/components/Image/Banner";
import styles from './style.module.scss';

export default function BoilerCard ({ data }) {
    return (
        <article className={styles.card}>
            <Banner bannerUrl={data.productImage} alt={data.label} />
            <h2> { data.label }</h2>
            <p> { data.description }</p>
        </article>
    );
}