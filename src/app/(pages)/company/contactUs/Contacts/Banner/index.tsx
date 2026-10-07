import Banner from "@/components/Image/Banner";
import styles from "./style.module.scss";

export default function ContactBanner () {
    return (
        <figure className={styles.bannerContainer}>
            <Banner bannerUrl="https://placehold.co/1280x254/png" alt="contact us" contentClassName={styles.content}>
                <figure className={styles.iconContainer}>
                    <Banner bannerUrl="/contactUs/location.svg" alt={"our location"} />
                </figure>
                <h3 className={styles.headline}> Head Office </h3>
                <p className={styles.subHeadline}> 42 Camden Grove, London NW1 8TL, United Kingdom </p>
            </Banner>
        </figure>
    );
}