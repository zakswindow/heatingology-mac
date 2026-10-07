import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";

export default function HamburgerMenuBack ({ onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            <Icon icon={ICONS.CHEVRON_LEFT} />
            Back
        </button>
    )
}