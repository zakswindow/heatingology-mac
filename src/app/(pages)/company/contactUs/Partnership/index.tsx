import LogoMarquee from "@/components/Section/Marquee/LogoMarquee";
import styles from "./style.module.scss";
import classNames from "classnames";

type TPartnership = {
    className?: string;
}

export default function Partnership ({ className }: TPartnership) {
    const containerCss = classNames(styles.container, className);
    return (
        <section className={containerCss}>
            <h2 className={styles.headline}> {`Partnered with the world's best brands`} </h2>
            <div style={{ position: "relative" }}>
                <LogoMarquee />
            </div>
        </section>
    );
}