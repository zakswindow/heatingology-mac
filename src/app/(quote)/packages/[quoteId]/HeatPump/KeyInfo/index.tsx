import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import RestartDialog from "@/components/Dialog/Modal/Restart";

export default function KeyInfo ({ quoteData }) {
    const { content } = quoteData;
    const { numOfBathrooms, numOfBedrooms } = JSON.parse(content);
    return (
        <div className={styles.selection}>
            <span className={styles.label}>Your selection: </span>
            <span className={styles.valueContainer}>
                {
                    numOfBedrooms &&
                        <span className={styles.value}>{`${numOfBedrooms.inputValue} bedroom(s)`}</span>
                }
                {
                    numOfBathrooms &&
                        <span className={styles.value}>{`${numOfBathrooms.inputValue} bathroom(s)`}</span>
                }
                {
                    quoteData.postcode &&
                        <span className={styles.value}> { quoteData.postcode }</span>
                }
                <RestartDialog
                    productType={quoteData.productType}
                    trigger={
                        <button>
                            <Icon icon={ICONS.RESTART} />
                        </button>
                    }
                />
            </span>
        </div>
    );
}