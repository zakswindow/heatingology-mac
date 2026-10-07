import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";

type TInfoCard = {
    content: string;
    phone?: string;
};

export default function InfoCard ({ content, phone }: TInfoCard) {
    return (
        <div className={styles.container}>
            <Icon icon={ICONS.INFO} />
            <p className={styles.text}>
                {content}
                {phone && (
                    <> <a href={`tel:${phone}`} className={styles.phone}>0333 577 0017</a></>
                )}
            </p>
        </div>
    );
}
