import classNames from "classnames";
import styles from "./style.module.scss";

type TRadioMark = {
    isSelected: boolean;
    radioMark: React.ReactNode;
}

export default function RadioMark ({ isSelected, radioMark }: TRadioMark) {
    return (
        <span className={styles.radioMarkContainer}>
            {
                isSelected && radioMark
            }
            {
                (!radioMark || (!isSelected && radioMark))  &&
                    <span
                        className={classNames(styles.radioMark, { [styles.checked]: isSelected })}>
                        {<span className={styles.radioDot} />}
                    </span>
            }
        </span> 
    );
}