import Banner from "@/components/Image/Banner";
import styles from './style.module.scss';
import Button from "@/components/Button";
import Link from "next/link";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function FooterBanner ({ title, buttonText, buttonUrl, bannerImage, specs }) {
    return (
        <Banner
            className={styles.banner}
            alt="footer banner"
            bannerUrl={bannerImage}
            contentClassName={styles.contentContainer}
        >
            <div className={styles.content}>
                <h2 className={styles.headline}> { title }</h2>
                <ul className={styles.benefits}>
                    {
                        specs.map((item) => {
                            return (
                                <li key={item}>
                                    <Icon icon={ICONS.CHECK_MARK_FILLED} />
                                    <span>{ item }</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <Link href={buttonUrl}>
                    <Button className={styles.button}> 
                        {buttonText}
                        <Icon icon={ICONS.ARROW_RIGHT} />
                    </Button>
                    
                </Link>
                
            </div>
            
        </Banner>
    );
}