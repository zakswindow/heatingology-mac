import classNames from "classnames";
import styles from "./style.module.scss";

type TRadioMark = {
    isSelected: boolean;
}

export default function RadioMark ({ isSelected }: TRadioMark) {
    return (
        <span className={styles.radioMarkContainer}>
            <span
                className={classNames(styles.radioMark, { [styles.checked]: isSelected })}>
                <span className={styles.radioDot} />
            </span>
        </span> 
    );
}