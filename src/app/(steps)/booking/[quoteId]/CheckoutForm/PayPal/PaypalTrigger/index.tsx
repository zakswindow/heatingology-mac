import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import RadioMark from "../../RadioMark";

export default function PayPalTrigger ({ isSelected }) {
    return (
        <div className={styles.container}>
            <RadioMark isSelected={isSelected} />
            <Icon icon={ICONS.PAYPAL} />
            Pay Later
        </div>
    );
}