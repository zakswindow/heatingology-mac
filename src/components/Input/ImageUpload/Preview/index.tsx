import Icon, { ICONS } from "@/components/Image/Icons";
import Button from "@/components/Button";
import styles from "./style.module.scss";

export default function Preview ({ image, onDelete }: { image: string; onDelete: () => void }) {
    return (
        <div className={styles.banner}>
            <img src={image} alt="Preview" className={styles.previewImage} />
            <Button className={styles.bin} onClick={onDelete}>
                <Icon className={styles.icon} icon={ICONS.CORSS_FILLED} />
            </Button>
        </div>
    );
}