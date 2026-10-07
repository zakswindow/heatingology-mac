import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import RestartDialog from "@/components/Dialog/Modal/Restart";

export default function KeyInfo ({ quoteData }) {

    return (
        <div className={styles.selection}>
            <span className={styles.label}>Your selection: </span>
            <span className={styles.valueContainer}>
                {
                    quoteData.postcode &&
                        <span className={styles.value}> { quoteData.postcode }</span>
                }
                <RestartDialog
                    productType={quoteData.productType}
                    trigger={
                        <button className={styles.icon}>
                            <Icon icon={ICONS.RESTART} />
                        </button>
                    }
                />
            </span>
        </div>
    );
}