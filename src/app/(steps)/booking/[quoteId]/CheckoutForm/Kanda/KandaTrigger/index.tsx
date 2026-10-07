import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import RadioMark from "../../RadioMark";

export default function KandaTrigger ({ isSelected }) {
    return (
        <div className={styles.container}>
            <RadioMark isSelected={isSelected} />
            <Icon icon={ICONS.KANDA} />
            Pay monthly with Kanda
        </div>
    );
}